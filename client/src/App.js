import React from "react"
import jwt_decode from "jwt-decode"
import { Provider } from "react-redux"
import { BrowserRouter, Switch, Route } from "react-router-dom"

// Importing app files

import store from "./redux/store"
import setTokenOnAllRoutes from "./utils/setTokenOnAllRoutes"
import { setCurrentUser, logOutUser } from "./redux/actions/authActions"

// Importing Custom Components

import Signup from "./components/pages/auth/Signup"
import Dashboard from "./components/pages/Dashboard"

// check for existing user session / check for tokens

if (localStorage.jwtToken) {
  //set auth token header
  setTokenOnAllRoutes(localStorage.jwtToken)
  //decode token and get user information
  const decoded = jwt_decode(localStorage.jwtToken)
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))
  // check for expired token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logOutUser())
    // redirect to login
    window.location.href = "/"
  }
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div
          style={{
            flexGrow: 1,
            height: "100vh",
            background: "linear-gradient(0deg, #c7c7c7 5%, #fff 95%)",
          }}
        >
          <Switch>
            <Route>
              <Route exact path="/" component={Dashboard} />
              <Route path="/signup" component={Signup} />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
