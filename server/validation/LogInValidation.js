const validator = require("validator")
const isEmpty = require("./IsEmpty")

module.exports = validateLogIn = (email, password) => {
  let errors = {}

  email = !isEmpty(email) ? email : ""
  password = !isEmpty(password) ? password : ""

  if (validator.isEmpty(email)) {
    errors.emailLogin = "Email field is required"
  }

  if (!validator.isEmail(email)) {
    errors.emailLogin = "Invalid email"
  }

  if (validator.isEmpty(password)) {
    errors.passwordLogin = "password field is required"
  }

  if (!validator.isLength(password, { min: 6, max: 30 })) {
    errors.passwordLogin = "Entered password must be minimum 6 characters"
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
