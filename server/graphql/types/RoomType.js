const graphql = require("graphql")
const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql

module.exports = new GraphQLObjectType({
  name: "Room",
  fields: () => ({
    id: { type: GraphQLID },
    roomName: { type: GraphQLString },
  }),
})
