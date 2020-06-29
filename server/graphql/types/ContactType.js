const graphql = require("graphql")
const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql

module.exports = new GraphQLObjectType({
  name: "Contact",
  fields: () => ({
    id: { type: GraphQLID },
    contactName: { type: GraphQLString },
  }),
})
