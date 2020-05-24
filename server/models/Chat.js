const mongoose = require("mongoose")

const ChatSchema = new mongoose.Schema(
  {
    message: String,
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: "Auth",
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("chat", ChatSchema)
