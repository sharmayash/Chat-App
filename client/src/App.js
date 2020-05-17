import React from "react"
import store from "./redux/store"
import { Provider } from "react-redux"
import { BrowserRouter, Switch, Route } from "react-router-dom"

// Importing Custom Components

import Signup from "./components/pages/auth/Signup"
import Dashboard from "./components/pages/Dashboard"

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
              <Route exact path="/signup" component={Signup} />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
