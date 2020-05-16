const graphql = require("graphql")
const { GraphQLObjectType } = graphql

const authQueries = require("./queries/auth")

module.exports = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    signIn: authQueries.signInUser,
  },
})
