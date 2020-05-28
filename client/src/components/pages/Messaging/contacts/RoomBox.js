import PropTypes from "prop-types"
import { connect } from "react-redux"
import React, { useEffect } from "react"
import { ListItem } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { deepPurple } from "@material-ui/core/colors"
import { getRooms } from "../../../../redux/actions/roomActions"

import ContactItem from "./ContactItem"

const useStyles = makeStyles((theme) => ({
  listItem: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    border: `1px solid ${deepPurple.A200}`,
  },
}))

export const RoomBox = (props) => {
  const classes = useStyles()

  useEffect(() => {
    props.getRooms(props.userId)
    // eslint-disable-next-line
  }, [])

  const { rooms, loading } = props.room

  let roomList

  if (rooms == null || loading) {
    roomList = <h1>Loading ...</h1>
  } else {
    roomList = rooms.map((room) => (
      <div key={room.id} style={{ margin: "5px", padding: "10px" }}>
        <ListItem alignItems="flex-start" className={classes.listItem}>
          <ContactItem roomName={room.roomName} />
        </ListItem>
      </div>
    ))
  }

  return roomList
}

RoomBox.propTypes = {
  room: PropTypes.object.isRequired,
  getRooms: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  room: state.room,
})

export default connect(mapStateToProps, { getRooms })(RoomBox)
