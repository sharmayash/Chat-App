const bcrypt = require("bcryptjs")
const { GraphQLString, GraphQLList } = require("graphql")

const Auth = require("../../models/auth")
const Chat = require("../../models/Chat")
const Contact = require("../../models/Contact")

const AuthType = require("../types/AuthType")
const ContactType = require("../types/ContactType")
const ContactRequests = require("../types/ContactRequests")

const createNewToken = require("../../config/signtoken")
const validateLogIn = require("../../validation/LogInValidation")

signInUser = {
  type: AuthType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, { email, password }) {
    try {
      const { errors, isValid } = validateLogIn(email, password)

      if (!isValid) {
        return Error(JSON.stringify(errors))
      }

      const user = await Auth.findOne({ email })
      if (!user) {
        errors.emailLogin = "No User exist with that email"
        return Error(JSON.stringify(errors))
      }
      if (!bcrypt.compare(password, user.password)) {
        errors.passwordLogin = "The password is not associated with this email"
        return Error(JSON.stringify(errors))
      } else {
        let userSessionData = createNewToken(user)
        return userSessionData
      }
    } catch (error) {
      return error
    }
  },
}

getContactRequests = {
  type: new GraphQLList(ContactRequests),
  args: {
    userId: { type: GraphQLString },
  },
  async resolve(parent, { userId }) {
    try {
      const user = await Auth.findById(userId).populate({
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

getContacts = {
  type: new GraphQLList(ContactType),
  args: {
    userId: { type: GraphQLString },
  },
  async resolve(parent, { userId }) {
    try {
      const user = await Auth.findById(userId).populate({
        path: "contacts", // TODO: Fix population
        model: Contact,
        populate: {
          path: "contactName",
          model: Auth,
        },
        populate: {
          path: "chats",
          model: Chat,
        },
      })

      console.log(user)
      // return user.contacts
    } catch (error) {
      return error
    }
  },
}

module.exports = { signInUser, getContactRequests, getContacts }
