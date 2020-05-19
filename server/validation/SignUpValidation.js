const validator = require("validator")
const isEmpty = require("./IsEmpty")

module.exports = validateSignUp = (
  name,
  email,
  username,
  password,
  password2
) => {
  let errors = {}

  name = !isEmpty(name) ? name : ""
  email = !isEmpty(email) ? email : ""
  username = !isEmpty(username) ? username : ""
  password = !isEmpty(password) ? password : ""
  password2 = !isEmpty(password2) ? password2 : ""

  if (!validator.isLength(name, { min: 3, max: 30 })) {
    errors.name = "Entered name must be in range of 3 to 30 characters"
  }

  if (validator.isEmpty(name)) {
    errors.name = "Name field is required"
  }

  if (!validator.isLength(username, { min: 3, max: 30 })) {
    errors.username = "Entered username must be in range of 3 to 30 characters"
  }

  if (validator.isEmpty(username)) {
    errors.username = "Userame field is required"
  }

  if (validator.isEmpty(email)) {
    errors.email = "Email field is required"
  }

  if (!validator.isEmail(email)) {
    errors.email = "Invalid email"
  }

  if (validator.isEmpty(password)) {
    errors.password = "password field is required"
  }

  if (!validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = "Entered password must be minimum 6 characters"
  }

  if (validator.isEmpty(password2)) {
    errors.password2 = "Confirm password field is required"
  }

  if (!validator.equals(password, password2)) {
    errors.password2 = "password must match"
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
