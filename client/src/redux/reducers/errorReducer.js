import { ERRORS } from "../actions/types"

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case ERRORS:
      let jsonObj = JSON.parse(action.payload)
      return jsonObj
    default:
      return state
  }
}
