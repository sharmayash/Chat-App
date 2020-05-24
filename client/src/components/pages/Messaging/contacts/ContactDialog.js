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
import ContactItem from "./ContactItem"

function ContactDialog(props) {
  const { onClose, selectedValue, open, usersList } = props

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleListItemClick = (value) => {
    onClose(value)
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
          <ListItem
            autoFocus
            button
            onClick={() => handleListItemClick("addAccount")}
          >
            <ListItemAvatar>
              <Avatar>
                <PersonAddRounded />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
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
