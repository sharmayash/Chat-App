import React from "react"
import PropTypes from "prop-types"

import {
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core"

function AddFormDialog(props) {
  const { onClose, open, isAddNewContact } = props

  let formContent

  formContent = isAddNewContact ? (
    <>
      <DialogTitle id="form-dialog-title">Add New Contact</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="username"
          label="Search with Username"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onClose} color="primary">
          Add
        </Button>
      </DialogActions>
    </>
  ) : (
    <>
      <DialogTitle id="form-dialog-title">Create A Group</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="roomName"
          label="Group Name"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onClose} color="primary">
          Create
        </Button>
      </DialogActions>
    </>
  )

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      {formContent}
    </Dialog>
  )
}

AddFormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isAddNewContact: PropTypes.bool.isRequired,
}

export default AddFormDialog
