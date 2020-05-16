import "./App.css"
import React from "react"
import store from "./redux/store"
import { Provider } from "react-redux"

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to VidChat</h1>
        </header>
      </div>
    </Provider>
  )
}

export default App
