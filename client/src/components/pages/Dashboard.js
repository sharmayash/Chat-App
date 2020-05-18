import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import Home from "./Home"
import InitialAuthPage from "./auth/InitialAuthPage"

const Dashboard = (props) => {
  let dashboardContent
  const { isAuthenticated } = props.auth

  if (isAuthenticated) {
    dashboardContent = <Home />
  } else {
    dashboardContent = <InitialAuthPage />
  }

  return dashboardContent
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(Dashboard)
