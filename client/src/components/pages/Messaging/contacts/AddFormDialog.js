import PropTypes from "prop-types"
import { connect } from "react-redux"
import React, { useState } from "react"
import { getRooms } from "../../../../redux/actions/roomActions"

import {
  Dialog,
  Button,
  Switch,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
} from "@material-ui/core"

function AddFormDialog(props) {
  const {
    onClose,
    open,
    isAddNewContact,
    socket,
    userId,
    username,
    joinORcreate,
  } = props
  const [state, setState] = useState({
    roomName: "",
    passCode: "",
    usernameToSearch: "",
  })
  const [isPrivate, setPublic] = useState(true)

  let formContent

  const handleSubmit = (e) => {
    e.preventDefault()

    socket.emit(
      "createGroup",
      {
        roomName: state.roomName,
        passCode: state.passCode,
        isPrivate,
        user_id: userId,
      },
      (ackdata) => console.log(ackdata)
    )

    props.getRooms(userId)
  }

  const handleJoin = (e) => {
    e.preventDefault()

    socket.emit(
      "joinNewGroup",
      {
        isPrivate,
        username,
        user_id: userId,
        roomName: state.roomName,
        passCode: state.passCode,
      },
      (ackdata) => console.log(ackdata)
    )

    props.getRooms(userId)
  }

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const toggleSwitch = () => {
    setPublic((prev) => !prev)
  }

  const handleContact = (e) => {
    e.preventDefault()

    socket.emit(
      "addContact",
      {
        userId,
        contactName: state.usernameToSearch,
      },
      (ackdata) => console.log(ackdata)
    )
  }

  if (isAddNewContact && joinORcreate === null) {
    formContent = (
      <form onSubmit={handleContact} noValidate autoComplete="off">
        <DialogTitle id="form-dialog-title">Add New Contact</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="usernameToSearch"
            label="Search with Username"
            type="text"
            value={state.usernameToSearch}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" onClick={onClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </form>
    )
  } else if (isAddNewContact === false && joinORcreate === "join") {
    formContent = (
      <form onSubmit={handleJoin} noValidate autoComplete="off">
        <DialogTitle id="form-dialog-title">Join A Group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            name="roomName"
            label="Group Name"
            value={state.rommName}
            onChange={handleChange}
          />
          {isPrivate ? (
            <TextField
              fullWidth
              type="text"
              margin="dense"
              name="passCode"
              label="Group PassCode"
              value={state.passCode}
              onChange={handleChange}
            />
          ) : null}
          <FormControlLabel
            value="start"
            style={{ marginTop: "5%" }}
            control={
              <Switch
                color="primary"
                checked={isPrivate}
                onChange={toggleSwitch}
              />
            }
            label={
              isPrivate
                ? "Uncheck the switch for public group"
                : "Check the switch for private group"
            }
            labelPlacement="start"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" onClick={onClose} color="primary">
            Join
          </Button>
        </DialogActions>
      </form>
    )
  } else {
    formContent = (
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <DialogTitle id="form-dialog-title">Create A Group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            name="roomName"
            label="Group Name"
            value={state.rommName}
            onChange={handleChange}
          />
          {isPrivate ? (
            <TextField
              fullWidth
              type="text"
              margin="dense"
              name="passCode"
              label="Group PassCode"
              value={state.passCode}
              onChange={handleChange}
            />
          ) : null}
          <FormControlLabel
            value="start"
            style={{ marginTop: "5%" }}
            control={
              <Switch
                color="primary"
                checked={isPrivate}
                onChange={toggleSwitch}
              />
            }
            label={
              isPrivate
                ? "Uncheck the switch for public group"
                : "Check the switch for private group"
            }
            labelPlacement="start"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" onClick={onClose} color="primary">
            Create
          </Button>
        </DialogActions>
      </form>
    )
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      {formContent}
    </Dialog>
  )
}

AddFormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  getRooms: PropTypes.func.isRequired,
  isAddNewContact: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, { getRooms })(AddFormDialog)
