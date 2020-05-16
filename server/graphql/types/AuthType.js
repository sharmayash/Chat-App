const graphql = require("graphql")
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = graphql

module.exports = new GraphQLObjectType({
  name: "Auth",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    token: { type: GraphQLString },
    tokenExpiry: { type: GraphQLInt },
  }),
})
