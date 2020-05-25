import React from "react"
import PropTypes from "prop-types"

import {
  List,
  Dialog,
  DialogTitle,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  DialogContent,
  DialogActions,
} from "@material-ui/core"

import PersonAddRounded from "@material-ui/icons/PersonAddRounded"
import GroupAddRounded from "@material-ui/icons/GroupAddRounded"
import ContactItem from "./ContactItem"

function ContactDialog(props) {
  const { onClose, selectedValue, open, usersList, openForm } = props

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleListItemClick = (value) => {
    onClose(value)
  }
  const handleActionClick = (val) => {
    openForm(val)
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
        <DialogContent dividers style={{ height: "40vh" }}>
          {usersList.map((user) => (
            <ListItem
              button
              onClick={() => handleListItemClick(user)}
              key={user}
            >
              <ContactItem />
            </ListItem>
          ))}
        </DialogContent>
        <DialogActions>
          <ListItem autoFocus button onClick={() => handleActionClick(true)}>
            <ListItemAvatar>
              <Avatar>
                <PersonAddRounded />
              </Avatar>
            </ListItemAvatar>
            <ListItemText secondary="Add Contact" />
          </ListItem>
          <ListItem autoFocus button onClick={() => handleActionClick(false)}>
            <ListItemAvatar>
              <Avatar>
                <GroupAddRounded />
              </Avatar>
            </ListItemAvatar>
            <ListItemText secondary="Create New Group" />
          </ListItem>
        </DialogActions>
      </List>
    </Dialog>
  )
}

ContactDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
}

export default ContactDialog
