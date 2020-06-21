import PropTypes from "prop-types"
import { connect } from "react-redux"
import React, { useEffect, useState } from "react"
import { ListItem } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { deepPurple } from "@material-ui/core/colors"

import { getRooms } from "../../../../redux/actions/roomActions"
import { setChats, chatsError } from "../../../../redux/actions/chatActions"

import ContactItem from "./ContactItem"

const useStyles = makeStyles(() => ({
  listDiv: {
    margin: "5px",
    padding: "10px",
  },
  listItem: {
    backgroundColor: deepPurple[50],
    "&:hover": {
      background: deepPurple[100],
    },
    borderRadius: "10px",
    border: `1px solid ${deepPurple.A200}`,
  },
  activeListItem: {
    backgroundColor: "#fff",
    "&:hover": {
      background: deepPurple[100],
    },
    borderRadius: "10px",
    borderLeft: `5px solid ${deepPurple.A200}`,
  },
}))

export const RoomBox = (props) => {
  const classes = useStyles()
  const [isSelected, selectIt] = useState(null)

  useEffect(() => {
    props.getRooms(props.userId)
    // eslint-disable-next-line
  }, [])

  let roomList
  const { rooms, loading } = props.room

  const joinRoom = (roomId, roomName) => {
    selectIt(roomId)

    props.socket.emit(
      "joinGroup",
      {
        roomId,
        username: props.username,
      },
      (err, chats) => {
        !err ? props.setChats(roomName, chats) : props.chatsError(err)
      }
    )
  }

  if (rooms.length === 0) {
    roomList = (
      <div className={classes.listDiv}>
        <h5>Add a Contact or Add / Create a Group</h5>
      </div>
    )
  } else if (loading) {
    roomList = (
      <div className={classes.listDiv}>
        <h5>Please Wait! Loading your contacts / group</h5>
      </div>
    )
  } else {
    roomList = rooms.map((room) => (
      <div key={room.id} className={classes.listDiv}>
        <ListItem
          button
          onClick={() => joinRoom(room.id, room.roomName)}
          alignItems="flex-start"
          className={
            isSelected === room.id ? classes.listItem : classes.activeListItem
          }
        >
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
  setChats: PropTypes.func.isRequired,
  chatsError: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  room: state.room,
})

export default connect(mapStateToProps, { getRooms, setChats, chatsError })(
  RoomBox
)
