const mongoose = require("mongoose")

const AuthSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    username: String,
    password: String,
    isOnline: Boolean,
    rooms: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "room",
      },
    ],
    contacts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "contact",
      },
    ],
    contactRequests: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "auth",
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Auth", AuthSchema)
