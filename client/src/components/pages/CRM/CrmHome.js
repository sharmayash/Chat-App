import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { makeStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

function CrmHome(props) {
  const classes = useStyles()
  const { user } = props.auth

  return (
    <main className={classes.content}>
      <h1>Welcome, {user.username} to CRM</h1>
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
        non enim praesent elementum facilisis leo vel.
      </Typography>
    </main>
  )
}

CrmHome.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, {})(CrmHome)
