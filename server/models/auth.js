const mongoose = require("mongoose")

const AuthSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    username: String,
    password: String,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Auth", AuthSchema)
