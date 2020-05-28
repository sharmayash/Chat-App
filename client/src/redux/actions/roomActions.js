import axios from "axios"
import { GET_ROOMS, ERRORS, LOADING_ROOMS } from "./types"

export const getRooms = (userID) => (dispatch) => {
  dispatch(loadingRooms())
  const reqBody = {
    query: `
      query {
        getRooms(user_id: "${userID}") {
          id
          roomName
        }
      }
    `,
  }

  axios
    .post("/graphql", reqBody)
    .then((res) => {
      if (res.data.data.getRooms) {
        dispatch({
          type: GET_ROOMS,
          payload: res.data.data.getRooms,
        })
      }
      if (res.data.errors) {
        dispatch({
          type: ERRORS,
          payload: res.data.errors[0].message,
        })
      }
    })
    .catch((err) => {
      dispatch({
        type: ERRORS,
        payload: err,
      })
    })
}

export const loadingRooms = () => {
  return {
    type: LOADING_ROOMS,
  }
}
