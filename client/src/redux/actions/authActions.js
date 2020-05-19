import axios from "axios"
import jwt_decode from "jwt-decode"
import { ERRORS, SET_CURRENT_USER } from "./types"
import setTokenOnAllRoutes from "../../utils/setTokenOnAllRoutes"

export const signup = (name, email, username, password, cPassword, history) => (
  dispatch
) => {
  const reqBody = {
    query: `
      mutation {
        createUser(name: "${name}", email: "${email}", username: "${username}", password: "${password}", password2: "${cPassword}") {
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
        const { token } = res.data.data.createUser
        // save token to local storage
        localStorage.setItem("jwtToken", token)
        // set token to Auth header
        setTokenOnAllRoutes(token)
        // Decode The data stored in token
        const decoded = jwt_decode(token)
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
          token
        }
      }
    `,
  }

  axios
    .post("/graphql", reqBody)
    .then((res) => {
      // get token
      const { token } = res.data.data.signIn
      // save token to local storage
      localStorage.setItem("jwtToken", token)
      // set token to Auth header
      setTokenOnAllRoutes(token)
      // Decode The data stored in token
      const decoded = jwt_decode(token)
      //set current user
      dispatch(setCurrentUser(decoded))
    })
    .catch((err) => {
      dispatch({
        type: ERRORS,
        payload: err.response.data,
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
  // remove auth header from every header
  setTokenOnAllRoutes(false)
  //set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}))
}
