const graphql = require("graphql")
const { GraphQLObjectType } = graphql

const authQueries = require("./queries/auth")
const roomQueries = require("./queries/room")

module.exports = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getRooms: roomQueries.getRooms,
    signIn: authQueries.signInUser,
    getContacts: authQueries.getContacts,
    getContactRequests: authQueries.getContactRequests,
  },
})
