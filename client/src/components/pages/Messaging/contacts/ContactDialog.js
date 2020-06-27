import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { getRooms } from "../../../../redux/actions/roomActions"
import { setChats, chatsError } from "../../../../redux/actions/chatActions"

import {
  List,
  Dialog,
  Tooltip,
  ListItem,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { deepPurple } from "@material-ui/core/colors"

import PersonAddRounded from "@material-ui/icons/PersonAddRounded"
import GroupAddRounded from "@material-ui/icons/GroupAddRounded"
import GroupAdd from "@material-ui/icons/GroupAdd"
import ContactItem from "./ContactItem"

const useStyles = makeStyles(() => ({
  listDiv: {
    margin: "10px",
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

function ContactDialog(props) {
  const classes = useStyles()
  const { onClose, open, openForm } = props
  const [isSelected, selectIt] = useState(null)

  const handleClose = () => {
    onClose()
  }

  const handleActionClick = (isOpenNewContact, joinORcreate) => {
    openForm(isOpenNewContact, joinORcreate)
  }

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
    roomList = <h5>Add a Contact or Add / Create a Group</h5>
  } else if (loading) {
    roomList = <h5>Please Wait! Loading your contacts / group</h5>
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

  return (
    <Dialog
      maxWidth="xs"
      onClose={handleClose}
      aria-labelledby="confirmation-dialog-title"
      open={open}
    >
      <DialogTitle id="confirmation-dialog-title">Select A Contact</DialogTitle>
      <List>
        <DialogContent
          dividers
          style={{ height: "40vh", backgroundColor: "#f5f5f5" }}
        >
          {roomList}
        </DialogContent>
        <DialogActions>
          <List>
            <Tooltip title="Add New Contact">
              <IconButton
                color="inherit"
                onClick={() => handleActionClick(true, null)}
              >
                <PersonAddRounded />
                <Typography variant="caption" style={{ marginLeft: "5px" }}>
                  Add Contact
                </Typography>
              </IconButton>
            </Tooltip>
            <Tooltip title="Join A Group">
              <IconButton
                color="inherit"
                onClick={() => handleActionClick(false, "join")}
              >
                <GroupAdd />
                <Typography variant="caption" style={{ marginLeft: "5px" }}>
                  Join Group
                </Typography>
              </IconButton>
            </Tooltip>
            <Tooltip title="Create A Group">
              <IconButton
                color="inherit"
                onClick={() => handleActionClick(false, "create")}
              >
                <GroupAddRounded />
                <Typography variant="caption" style={{ marginLeft: "5px" }}>
                  Create Group
                </Typography>
              </IconButton>
            </Tooltip>
          </List>
        </DialogActions>
      </List>
    </Dialog>
  )
}

ContactDialog.propTypes = {
  room: PropTypes.object.isRequired,
  getRooms: PropTypes.func.isRequired,
  setChats: PropTypes.func.isRequired,
  chatsError: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  room: state.room,
})

export default connect(mapStateToProps, { getRooms, setChats, chatsError })(
  ContactDialog
)
