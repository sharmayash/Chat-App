const jwt = require("jsonwebtoken")

const createNewtoken = (newUser) => {
  let { id, name, email, username, password } = newUser

  let token = jwt.sign(
    {
      name,
      email,
      username,
    },
    "OurSecretKeyHere",
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
