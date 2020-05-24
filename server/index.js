const cors = require("cors")
const express = require("express")
const passport = require("passport")
const schema = require("./graphql/index")
const expressGraphql = require("express-graphql")

const app = express()
const port = process.env.PORT || 4000

// --------- Middlewares -----------

// 1 Allow request for client from different port and url

app.use(cors())

// 2. db config

require("./dbConfig/")

// 3. passport

app.use(passport.initialize())
require("./config/passport")(passport)

// 4. Graphql

app.use(
  "/graphql",
  expressGraphql({
    schema,
    graphiql: true,
  })
)

app.use(express.static(`${__dirname}/public`))

// -------- Middlewares end ---------

// Test Route

app.get("/", (req, res) => {
  res.sendFile("index.html")
})

// listening to server

const server = app.listen(port, () => console.log(`server started on ${port}`))

// for socket related tasks

const io = require("socket.io").listen(server)

require("./ioServer")(io)
