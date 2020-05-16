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
let activeSockets = []

io.on("connection", (socket) => {
  console.log(`Socket connected ${socket.id}`)

  socket.on("test", (data) => {
    console.log(3144, data)
    socket.emit("fromServer", `3144 test ${data}`)
  })

  const existingSocket = activeSockets.find(
    (existingSocket) => existingSocket === socket.id
  )

  if (!existingSocket) {
    activeSockets.push(socket.id)

    socket.emit("update-user-list", {
      users: activeSockets.filter(
        (existingSocket) => existingSocket !== socket.id
      ),
    })

    socket.broadcast.emit("update-user-list", {
      users: [socket.id],
    })
  }

  socket.on("call-user", (data) => {
    socket.to(data.to).emit("call-made", {
      offer: data.offer,
      socket: socket.id,
    })
  })

  socket.on("make-answer", (data) => {
    socket.to(data.to).emit("answer-made", {
      socket: socket.id,
      answer: data.answer,
    })
  })

  socket.on("reject-call", (data) => {
    socket.to(data.from).emit("call-rejected", {
      socket: socket.id,
    })
  })

  socket.on("disconnect", () => {
    activeSockets = activeSockets.filter(
      (existingSocket) => existingSocket !== socket.id
    )
    socket.broadcast.emit("remove-user", {
      socketId: socket.id,
    })
  })
})
