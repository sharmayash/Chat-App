const graphql = require("graphql")
const { GraphQLObjectType } = graphql

const authMutations = require("./mutations/auth")

module.exports = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: authMutations.createUser,
  },
})
