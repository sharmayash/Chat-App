const graphql = require("graphql")
const { GraphQLObjectType } = graphql

const authMutations = require("./mutations/auth")

module.exports = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: authMutations.createUser,
    acceptContactRequest: authMutations.acceptContactRequest,
    deleteContactRequest: authMutations.deleteContactRequest,
  },
})
