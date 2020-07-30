const bcrypt = require("bcryptjs")
const { GraphQLString, GraphQLNonNull, GraphQLList } = require("graphql")

const Auth = require("../../models/auth")

const AuthType = require("../types/AuthType")
const ContactRequests = require("../types/ContactRequests")

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

acceptContactRequest = {
  type: new GraphQLList(ContactRequests),
  args: {
    userId: { type: GraphQLString },
    cReqId: { type: GraphQLString },
  },
  async resolve(parent, { userId, cReqId }) {
    try {
      await Auth.findByIdAndUpdate(
        cReqId,
        {
          $addToSet: { contacts: userId },
        },
        (err, updatedUser) => {
          if (err) return err
          console.log("You added as contact to others account")
        }
      )

      const user = await Auth.findByIdAndUpdate(
        userId,
        {
          $addToSet: { contacts: cReqId },
          $pull: { contactRequests: cReqId },
        },
        (err, updatedUser) => {
          if (err) return err
          console.log("You Accept Contact Request")
        }
      ).populate({
        path: "contactRequests",
        model: Auth,
        select: "username _id",
      })

      return user.contactRequests
    } catch (error) {
      return error
    }
  },
}

deleteContactRequest = {
  type: new GraphQLList(ContactRequests),
  args: {
    userId: { type: GraphQLString },
    cReqId: { type: GraphQLString },
  },
  async resolve(parent, { userId, cReqId }) {
    try {
      const user = await Auth.findByIdAndUpdate(
        userId,
        {
          $pull: { contactRequests: cReqId },
        },
        { safe: true, upsert: true },
        (err, _) => {
          if (err) return err
          console.log("Contact Updated")
        }
      ).populate({
        path: "contactRequests",
        model: Auth,
        select: "username _id",
      })

      return user.contactRequests
    } catch (error) {
      return error
    }
  },
}

module.exports = {
  createUser,
  acceptContactRequest,
  deleteContactRequest,
}
