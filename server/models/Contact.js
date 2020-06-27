const mongoose = require("mongoose")

const ContactSchema = new mongoose.Schema(
  {
    contactName: {
      type: mongoose.Schema.ObjectId,
      ref: "Auth",
    },
    chats: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "chat",
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("contact", ContactSchema)
