import { SET_CHATS, ERRORS } from "./types"

export const setChats = (roomName, chats) => (dispatch) => {
  dispatch({
    type: SET_CHATS,
    roomName: roomName,
    payload: chats,
  })
}

export const chatsError = (err) => (dispatch) => {
  dispatch({
    type: ERRORS,
    payload: err,
  })
}
