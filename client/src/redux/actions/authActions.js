import axios from "axios"
import jwt_decode from "jwt-decode"
import { ERRORS, SET_CURRENT_USER, GET_CONTACT_REQUESTS } from "./types"
import setTokenOnAllRoutes from "../../utils/setTokenOnAllRoutes"

export const signup = (name, email, username, password, cPassword, history) => (
  dispatch
) => {
  const reqBody = {
    query: `
      mutation {
        createUser(name: "${name}", email: "${email}", username: "${username}", password: "${password}", password2: "${cPassword}") {
          id
          token
        }
      }
    `,
  }

  axios
    .post("/graphql", reqBody)
    .then((res) => {
      if (res.data.data.createUser) {
        // get token
        const { id, token } = res.data.data.createUser
        // save token to local storage
        localStorage.setItem("jwtToken", token)
        localStorage.setItem("userId", id)
        // set token to Auth header
        setTokenOnAllRoutes(token)
        // Decode The data stored in token
        const decoded = jwt_decode(token)
        decoded.id = id
        //set current user
        dispatch(setCurrentUser(decoded))
        // redirect to home page
        history.push("/")
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

export const login = (email, password) => (dispatch) => {
  const reqBody = {
    query: `
      query {
        signIn(email: "${email}", password: "${password}") {
          id
          token
        }
      }
    `,
  }

  axios
    .post("/graphql", reqBody)
    .then((res) => {
      if (res.data.data.signIn) {
        // get token
        const { id, token } = res.data.data.signIn
        // save token to local storage
        localStorage.setItem("jwtToken", token)
        localStorage.setItem("userId", id)
        // set token to Auth header
        setTokenOnAllRoutes(token)
        // Decode The data stored in token
        const decoded = jwt_decode(token)
        decoded.id = id
        //set current user
        dispatch(setCurrentUser(decoded))
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

export const setCurrentUser = (decode) => {
  return {
    type: SET_CURRENT_USER,
    payload: decode,
  }
}

export const logOutUser = () => (dispatch) => {
  //remove token from localstorage
  localStorage.removeItem("jwtToken")
  localStorage.removeItem("userId")
  // remove auth header from every header
  setTokenOnAllRoutes(false)
  //set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}))
}

export const getContactRequests = (userID) => (dispatch) => {
  const reqBody = {
    query: `
      query {
        getContactRequests(userId: "${userID}") {
          id
          username
        }
      }
    `,
  }

  axios
    .post("/graphql", reqBody)
    .then((res) => {
      if (res.data.data.getContactRequests) {
        dispatch({
          type: GET_CONTACT_REQUESTS,
          payload: res.data.data.getContactRequests,
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

export const deleteContactRequest = (userID, cReqId) => (dispatch) => {
  const reqBody = {
    query: `
      mutation {
        deleteContactRequest(userId: "${userID}", cReqId: "${cReqId}") {
          id
          username
        }
      }
    `,
  }

  axios
    .post("/graphql", reqBody)
    .then((res) => {
      if (res.data.data.deleteContactRequest) {
        dispatch({
          type: GET_CONTACT_REQUESTS,
          payload: res.data.data.deleteContactRequest,
        })
      }
      if (res.data.errors) {
        dispatch({
          type: ERRORS,
          payload: res.data.errors,
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
