import { GET_ROOMS, LOADING_ROOMS } from "../actions/types"

const initialState = {
  rooms: [],
  loading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_ROOMS:
      return {
        ...state,
        loading: true,
      }
    case GET_ROOMS:
      return {
        ...state,
        loading: false,
        rooms: action.payload,
      }
    default:
      return state
  }
}
