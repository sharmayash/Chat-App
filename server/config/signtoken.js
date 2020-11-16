const jwt = require("jsonwebtoken")
const keys = require("./keys")

const createNewtoken = (newUser) => {
  let { id, name, email, username, password } = newUser

  let token = jwt.sign(
    {
      name,
      email,
      username,
    },
    keys.secretOrKey,
    {
      expiresIn: "1h",
    }
  )

  return {
    id,
    name,
    email,
    username,
    password,
    token,
    tokenExpiry: 1,
  }
}

module.exports = createNewtoken
