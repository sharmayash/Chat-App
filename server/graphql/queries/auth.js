const bcrypt = require("bcryptjs")
const Auth = require("../../models/auth")
const { GraphQLString } = require("graphql")
const AuthType = require("../types/AuthType")
const createNewToken = require("../../config/signtoken")

signInUser = {
  type: AuthType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, { email, password }) {
    try {
      const user = await Auth.findOne({ email })
      if (!user) return Error("No User exist with that email")
      if (!bcrypt.compare(password, user.password)) {
        throw new Error("Invalid password")
      } else {
        let userSessionData = createNewToken(user)
        return userSessionData
      }
    } catch (error) {
      return error
    }
  },
}

module.exports = { signInUser }
