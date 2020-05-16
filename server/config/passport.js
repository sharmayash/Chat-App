const { Strategy, ExtractJwt } = require("passport-jwt")

const User = require("../models/auth")

const options = {}

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = "OurSecretKeyHere"

module.exports = (passport) => {
  passport.use(
    new Strategy(options, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user)
          }
          return done(null, false)
        })
        .catch((err) => console.log(err))
    })
  )
}
