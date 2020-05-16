const bcrypt = require("bcryptjs")

const Auth = require("../../models/auth")
const AuthType = require("../types/AuthType")
const createNewToken = require("../../config/signtoken")

const { GraphQLString, GraphQLNonNull } = require("graphql")

createUser = {
  type: AuthType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent, { name, email, username, password }) {
    try {
      const ExistingUser = Auth.findOne({ email })
      if (ExistingUser) return Error("User with this email already Exist")

      // create hash of password
      let salt = bcrypt.genSaltSync(11)
      let hash = bcrypt.hashSync(password, salt)

      let newUser = new Auth({
        name,
        email,
        username,
        password: hash,
      })

      // save user in db
      await newUser.save()

      let userSessionData = createNewToken(newUser)
      return userSessionData
    } catch (error) {
      console.log(error)
      throw error
    }
  },
}

module.exports = {
  createUser,
}
