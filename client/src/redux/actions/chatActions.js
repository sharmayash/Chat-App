import { SET_CHATS, NEW_CHATS, ERRORS } from "./types"

export const setChats = (roomName, chats) => (dispatch) => {
  dispatch({
    type: SET_CHATS,
    roomName: roomName,
    payload: chats,
  })
}

export const newMsg = (roomName, chat) => (dispatch) => {
  dispatch({
    type: NEW_CHATS,
    roomName: roomName,
    payload: chat,
  })
}

export const chatsError = (err) => (dispatch) => {
  dispatch({
    type: ERRORS,
    payload: err,
  })
}
