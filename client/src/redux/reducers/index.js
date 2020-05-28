import { combineReducers } from "redux"
import authReducer from "./authReducer"
import roomReducer from "./roomReducer"
import errorReducer from "./errorReducer"

export default combineReducers({
  auth: authReducer,
  room: roomReducer,
  errors: errorReducer,
})
