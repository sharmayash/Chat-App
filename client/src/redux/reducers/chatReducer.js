import { SET_CHATS } from "../actions/types"

const initialState = {
  currentRoom: "",
  chats: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CHATS:
      return {
        ...state,
        currentRoom: action.roomName,
        chats: action.payload.reverse(),
      }
    default:
      return state
  }
}
