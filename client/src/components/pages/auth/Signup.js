import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import {
  Card,
  CardContent,
  TextField,
  Button,
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
  })

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newUser = {
      name: state.name,
      email: state.email,
      username: state.username,
      password: state.password,
    }

    console.log(newUser)
    // props.registerUser(newUser, props.history)
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
            {/* {props.errors.name ? (
            <Typography variant="caption" color="secondary">
              {props.errors.name}
            </Typography>
          ) : (
            ""
          )} */}
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
            {/* {props.errors.username ? (
            <Typography variant="caption" color="secondary">
              {props.errors.username}
            </Typography>
          ) : (
            ""
          )} */}
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
            {/* {props.errors.emailLogin ? (
          <Typography variant="caption" color="secondary">
            {props.errors.emailLogin}
          </Typography>
        ) : (
          ""
        )} */}
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
            {/* {props.errors.passwordLogin ? (
          <Typography variant="caption" color="secondary">
            {props.errors.passwordLogin}
          </Typography>
        ) : (
          ""
        )} */}
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

Signup.propTypes = {}

export default Signup
