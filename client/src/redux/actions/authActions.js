import axios from "axios"

export const login = (email, password) => (dispatch) => {
  const reqBody = {
    query: `
      query {
        signIn(email: "${email}", password: "${password}") {
          id
          name
          email
          username
          password
          token
          tokenExpiry
        }
      }
    `,
  }

  axios
    .post("/graphql", reqBody)
    .then((res) => {
      console.log(res.data)
      // // get token
      // const { token } = res.data
      // // save token to local storage
      // localStorage.setItem("jwtToken", token)
      // // set token to Auth header
      // setAuthToken(token)
      // // decode token to get user data
      // const decode = jwt_decode(token)
      // //set current user
      // dispatch(setCurrentUser(decode))
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
