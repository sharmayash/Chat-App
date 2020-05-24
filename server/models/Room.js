const mongoose = require("mongoose")

const RoomSchema = new mongoose.Schema(
  {
    roomName: String,
    isPrivate: Boolean,
    admin: {
      type: mongoose.Schema.ObjectId,
      ref: "Auth",
    },
    chats: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "chat",
      },
    ],
    usersAvailable: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Auth",
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("room", RoomSchema)
