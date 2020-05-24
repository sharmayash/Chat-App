const Room = require("./models/Room")
const Auth = require("./models/auth")
const Chat = require("./models/Chat")

let activeSockets = []

const ioServer = (io) => {
  io.on("connection", (socket) => {
    console.log(`Socket connected ${socket.id}`)

    socket.on("test", (data) => {
      console.log(3144, data)
      socket.emit("fromServer", `3144 test ${data}`)
    })

    socket.on("joinGroup", async (data, ackFunc) => {
      const room = await Room.findOne({
        name: data.room_name,
      })
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

      if (room) {
        ackFunc("Joining Room")
      }

      if (!room) {
        ackFunc("Room Not Exist For You")
      }

      socket.join(room.roomName, (err) => {
        if (err) callback(err)
      })

      socket.broadcast.to(room.roomName).emit("notification", {
        message: `${data.username} Joined!`,
        type: "info",
      })

      callback(null, room.chats)
    })

    socket.on("createGroup", async (data, ackFunc) => {
      const { isPrivate, roomName, user_id } = data

      const room = new Room({
        isPrivate,
        roomName,
        admin: user_id,
        usersAvailable: [user_id],
      })

      await Auth.findOneAndUpdate({
        _id: user_id,
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

      socket.join(room_name, (err) => {
        if (err) ackFunc(err)
        ackFunc(true)
      })
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
