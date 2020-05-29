const Room = require("./models/Room")
const Auth = require("./models/auth")
const Chat = require("./models/Chat")

let activeSockets = []

const ioServer = (io) => {
  io.on("connection", (socket) => {
    console.log(`Socket connected ${socket.id}`)

    socket.on("test", (data, ackFunc) => {
      console.log(data)
      ackFunc("Ack. Func Data")
      socket.emit("fromServer", `Message From Server with event`) // another event
    })

    socket.on("joinGroup", async (data, ackFunc) => {
      const room = await Room.findById(data.roomId)
        .populate({
          path: "chats",
          model: Chat,
          select: "-updatedAt -__v",
          options: { sort: { createdAt: -1 } },
          populate: {
            path: "sender",
            model: Auth,
            select: "username -_id",
          },
        })
        .select("roomName chats usersAvailable isPrivate -_id")

      if (!room) {
        ackFunc("Room Not Exist For You")
      }

      socket.join(room.roomName, (err) => {
        if (err) ackFunc(err)
        console.log("You Joined The room")
      })

      socket.broadcast.to(room.roomName).emit("notification", {
        message: `${data.username} Joined!`,
        type: "info",
      })

      ackFunc(null, room.chats)
    })

    socket.on("createGroup", async (data, ackFunc) => {
      const { isPrivate, roomName, passCode, user_id } = data
      let newRoom

      if (isPrivate) {
        newRoom = {
          roomName,
          isPrivate,
          passCode,
          admin: user_id,
          usersAvailable: [user_id],
        }
      } else {
        newRoom = {
          roomName,
          isPrivate,
          admin: user_id,
          usersAvailable: [user_id],
        }
      }

      const room = await new Room(newRoom)

      await Auth.findOneAndUpdate({
        id: user_id,
        $push: { rooms: room._id },
      })
        .then(() => ackFunc("Room Added To Your Account"))
        .catch((err) =>
          ackFunc(`Error Occured while adding Room to your account ${err}`)
        )

      room
        .save()
        .then(() => ackFunc("Room Created"))
        .catch((err) => ackFunc("Error In Creating Room"))

      socket.join(roomName, (err) => {
        if (err) ackFunc(err)
        ackFunc(true)
      })
    })

    socket.on("sendMsg", async (data) => {
      try {
        console.log(data)

        const chat = await Chat({
          message: data.text,
          sender: data.userId,
          timestamp: data.timestamp,
        }).save()

        await Room.findOneAndUpdate(
          { roomName: data.roomName },
          {
            $push: {
              chats: await chat._id,
            },
          }
        ).then(() => console.log("chat added to room"))

        io.to(data.roomName).emit("newMsg", {
          id: chat._id,
          text: data.text,
          timestamp: data.timestamp,
          sender: { username: data.username },
        })
      } catch (error) {
        console.log(error)
      }
    })

    const existingSocket = activeSockets.find(
      (existingSocket) => existingSocket === socket.id
    )

    if (!existingSocket) {
      activeSockets.push(socket.id)

      socket.emit("update-user-list", {
        users: activeSockets.filter(
          (existingSocket) => existingSocket !== socket.id
        ),
      })

      socket.broadcast.emit("update-user-list", {
        users: [socket.id],
      })
    }

    socket.on("call-user", (data) => {
      socket.to(data.to).emit("call-made", {
        offer: data.offer,
        socket: socket.id,
      })
    })

    socket.on("make-answer", (data) => {
      socket.to(data.to).emit("answer-made", {
        socket: socket.id,
        answer: data.answer,
      })
    })

    socket.on("reject-call", (data) => {
      socket.to(data.from).emit("call-rejected", {
        socket: socket.id,
      })
    })

    socket.on("disconnect", () => {
      activeSockets = activeSockets.filter(
        (existingSocket) => existingSocket !== socket.id
      )
      socket.broadcast.emit("remove-user", {
        socketId: socket.id,
      })
    })
  })
}

module.exports = ioServer
