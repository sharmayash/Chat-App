const graphql = require("graphql")
const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql

module.exports = new GraphQLObjectType({
  name: "ContactRequest",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
  }),
})
