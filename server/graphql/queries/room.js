const { GraphQLString, GraphQLList } = require("graphql")

const Auth = require("../../models/auth")
const Room = require("../../models/Room")

const RoomType = require("../types/RoomType")

getRooms = {
  type: new GraphQLList(RoomType),
  args: {
    user_id: { type: GraphQLString },
  },
  async resolve(parent, { user_id }) {
    try {
      const user = await Auth.findById(user_id).populate({
        path: "rooms",
        model: Room,
        select: "roomName _id",
      })

      return user.rooms
    } catch (error) {
      return error
    }
  },
}

module.exports = { getRooms }
