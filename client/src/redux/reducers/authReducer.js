import isEmpty from "../../validation/isEmpty"
import { SET_CURRENT_USER, GET_CONTACT_REQUESTS } from "../actions/types"

const initialState = {
  isAuthenticated: false,
  user: {},
  contactRequests: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      }
    case GET_CONTACT_REQUESTS:
      return {
        ...state,
        contactRequests: action.payload,
      }
    default:
      return state
  }
}
