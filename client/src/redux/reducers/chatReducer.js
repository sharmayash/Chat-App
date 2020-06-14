import { SET_CHATS, NEW_CHATS } from "../actions/types"

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
    case NEW_CHATS:
      return {
        ...state,
        currentRoom: action.roomName,
        chats: [...state.chats, action.payload],
      }
    default:
      return state
  }
}
