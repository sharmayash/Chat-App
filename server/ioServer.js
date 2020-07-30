const Room = require("./models/Room")
const Auth = require("./models/auth")
const Chat = require("./models/Chat")

const ioServer = (io) => {
  io.on("connection", (socket) => {
    console.log(`Socket connected ${socket.id}`)

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
        console.log(`You Joined ${room.roomName}`)
      })

      socket.broadcast.to(room.roomName).emit("notification", {
        message: `${data.username} Joined!`,
        type: "info",
      })

      ackFunc(null, room.chats)
    })

    socket.on("joinNewGroup", async (data, ackFunc) => {
      const room =
        data.roomName && data.passCode
          ? await Room.findOne({
              roomName: data.roomName,
              passCode: data.passCode,
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
              .select("roomName chats usersAvailable isPrivate _id")
          : await Room.findOne({
              roomName: data.roomName,
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
              .select("roomName chats usersAvailable isPrivate _id")

      if (!room) {
        ackFunc("Room Not Exist For You")
      }

      socket.join(room.roomName, async (err) => {
        if (err) ackFunc(err)

        await Auth.findByIdAndUpdate(data.user_id, {
          $push: { rooms: room._id },
        })
          .then(() => console.log("Room Added To Your Account"))
          .catch((err) => ackFunc(err))

        console.log(`You Joined ${room.roomName}`)
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

      await Auth.findByIdAndUpdate(user_id, {
        $push: { rooms: room._id },
      })
        .then(() => console.log("Room Added To Your Account"))
        .catch((err) =>
          ackFunc(`Error Occured while adding Room to your account ${err}`)
        )

      room
        .save()
        .then(() => console.log("Room Created"))
        .catch((err) => ackFunc("Error In Creating Room"))

      socket.join(roomName, (err) => {
        if (err) ackFunc(err)
        ackFunc(true)
      })
    })

    socket.on("sendMsg", async (data) => {
      try {
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
          message: data.text,
          timestamp: data.timestamp,
          sender: { username: data.username },
        })
      } catch (error) {
        console.log(error)
      }
    })

    socket.on("addContact", async (data, ackFunc) => {
      const { contactName, userId } = data

      await Auth.findOneAndUpdate(
        { username: contactName },
        {
          $addToSet: { contactRequests: userId }, // add senders userid to requests of receiver
        }
      )
        .then((contact) => {
          ackFunc(`Your Request Sent to ${contact.username}`)
        })
        .catch((err) => ackFunc(err))
    })
  })
}

module.exports = ioServer
