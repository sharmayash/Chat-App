import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Button } from "@material-ui/core"
import { logOutUser } from "../../redux/actions/authActions"

function Home(props) {
  const { user } = props.auth
  const logOutNow = () => {
    props.logOutUser()
  }

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <Button onClick={logOutNow}>Log Out</Button>
    </div>
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
