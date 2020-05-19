import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { logOutUser } from "../../redux/actions/authActions"

import { makeStyles } from "@material-ui/core/styles"
import { Button, Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

function Home(props) {
  const classes = useStyles()
  const { user } = props.auth

  const logOutNow = () => {
    props.logOutUser()
  }

  return (
    <main className={classes.content}>
      {/* <div className={classes.toolbar} /> */}
      <h1>Welcome, {user.username}</h1>
      <Button onClick={logOutNow}>Log Out</Button>
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
        non enim praesent elementum facilisis leo vel.
      </Typography>
    </main>
  )
}

Home.propTypes = {
  auth: PropTypes.object.isRequired,
  logOutUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logOutUser })(Home)
