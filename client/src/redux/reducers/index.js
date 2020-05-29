import { combineReducers } from "redux"
import authReducer from "./authReducer"
import roomReducer from "./roomReducer"
import chatReducer from "./chatReducer"
import errorReducer from "./errorReducer"

export default combineReducers({
  auth: authReducer,
  room: roomReducer,
  chat: chatReducer,
  errors: errorReducer,
})
