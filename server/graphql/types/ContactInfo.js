const graphql = require("graphql")
const ContactType = require("./ContactType")
const ContactRequests = require("./ContactRequests")
const { GraphQLObjectType, GraphQLList } = graphql

module.exports = new GraphQLObjectType({
  name: "ContactInfo",
  fields: () => ({
    contacts: { type: new GraphQLList(ContactType) },
    contactReq: { type: new GraphQLList(ContactRequests) },
  }),
})
