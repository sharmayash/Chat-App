import PropTypes from "prop-types"
import { connect } from "react-redux"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import { login } from "../../../redux/actions/authActions"

import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  Button,
  Grid,
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#282c34",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    fontSize: "calc(10px + 2vmin)",
    color: "white",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
  },
  login: {
    // background: "linear-gradient(45deg, #fff 30%, #40c4ff 90%)",
  },
  register: {
    color: "#64dd17",
    marginLeft: "20px",
  },
  btn: {
    margin: "20px",
  },
}))

function InitialAuthPage(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  })

  function handleClickOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  const handleChange = (event) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    props.login(formValue.email, formValue.password)
  }
  const Login = () => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        className={classes.login}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent dividers>
          <TextField
            required
            margin="dense"
            name="email"
            value={formValue.email}
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
            value={formValue.password}
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
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Link to="/signup" className={classes.register} onClick={handleClose}>
            Sign Up Instead ?
          </Link>

          <div>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} type="submit" color="primary">
              Submit
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <header className={classes.header}>
      <h1>Welcome to VidChat</h1>
      <Grid>
        <Button
          className={classes.btn}
          variant="contained"
          color="default"
          onClick={handleClickOpen}
        >
          Log In
        </Button>
        <Button
          className={classes.btn}
          component={Link}
          variant="contained"
          to="/signup"
          color="primary"
        >
          Sign Up
        </Button>
      </Grid>
      {true ? Login() : ""}
    </header>
  )
}

InitialAuthPage.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { login })(InitialAuthPage)
