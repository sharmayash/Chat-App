import PropTypes from "prop-types"
import { connect } from "react-redux"
import React, { useState, useEffect } from "react"
import { signup } from "../../../redux/actions/authActions"
import { makeStyles } from "@material-ui/core/styles"
import {
  Card,
  Button,
  TextField,
  Typography,
  CardContent,
  CardActions,
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  div: {
    height: "100vh",
    display: "flex",
    direction: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    width: 375,
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  btn: {
    margin: "20px",
  },
}))

function Signup(props) {
  const classes = useStyles()
  const [state, setState] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    password2: "",
  })

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/")
    }
  }, [props])

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { name, email, username, password, password2 } = state
    props.signup(name, email, username, password, password2, props.history)
  }

  return (
    <div className={classes.div}>
      <Card className={classes.root} variant="outlined">
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <CardContent>
            <TextField
              required
              margin="dense"
              name="name"
              value={state.name}
              onChange={handleChange}
              label="Full Name"
              type="text"
              variant="outlined"
              fullWidth
            />
            {props.errors.name ? (
              <Typography variant="caption" color="secondary">
                {props.errors.name}
              </Typography>
            ) : (
              ""
            )}
            <TextField
              required
              margin="dense"
              name="username"
              value={state.username}
              onChange={handleChange}
              label="UserName"
              type="text"
              variant="outlined"
              fullWidth
            />
            {props.errors.username ? (
              <Typography variant="caption" color="secondary">
                {props.errors.username}
              </Typography>
            ) : (
              ""
            )}
            <TextField
              required
              margin="dense"
              name="email"
              value={state.email}
              onChange={handleChange}
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
            />
            {props.errors.email ? (
              <Typography variant="caption" color="secondary">
                {props.errors.email}
              </Typography>
            ) : (
              ""
            )}
            <TextField
              required
              margin="dense"
              label="Password"
              type="password"
              name="password"
              value={state.password}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
            {props.errors.password ? (
              <Typography variant="caption" color="secondary">
                {props.errors.password}
              </Typography>
            ) : (
              ""
            )}
            <TextField
              required
              margin="dense"
              label="Confirm Password"
              type="password"
              name="password2"
              value={state.password2}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
            {props.errors.password2 ? (
              <Typography variant="caption" color="secondary">
                {props.errors.password2}
              </Typography>
            ) : (
              ""
            )}
          </CardContent>
          <CardActions className={classes.actions}>
            <Button type="submit" variant="contained" className={classes.btn}>
              Sign up
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  )
}

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
})

export default connect(mapStateToProps, { signup })(Signup)
