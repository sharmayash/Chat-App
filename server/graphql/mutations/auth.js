const bcrypt = require("bcryptjs")
const { GraphQLString, GraphQLNonNull } = require("graphql")

const Auth = require("../../models/auth")
const AuthType = require("../types/AuthType")
const createNewToken = require("../../config/signtoken")
const validateSignUp = require("../../validation/SignUpValidation")

createUser = {
  type: AuthType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    password2: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent, { name, email, username, password, password2 }) {
    try {
      const { errors, isValid } = validateSignUp(
        name,
        email,
        username,
        password,
        password2
      )

      if (!isValid) {
        return Error(JSON.stringify(errors))
      }

      const ExistingEmail = await Auth.findOne({ email })
      const ExistingUsername = await Auth.findOne({ username })

      if (ExistingEmail) {
        errors.email = "User with this email already Exist"
        return Error(JSON.stringify(errors))
      }

      if (ExistingUsername) {
        errors.username = "User with this Username already Exist"
        return Error(JSON.stringify(errors))
      }

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
