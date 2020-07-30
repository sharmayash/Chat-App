import React, { useEffect, useState } from "react"

import { makeStyles } from "@material-ui/core/styles"
import Check from "@material-ui/icons/CheckCircleOutlineRounded"
import DeleteIcon from "@material-ui/icons/DeleteOutlineRounded"

import {
  List,
  Avatar,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "300px",
  },
}))

export const NotificationPop = ({
  userId,
  contactRequests,
  getContactRequests,
  acceptContactRequest,
  deleteContactRequest,
}) => {
  const classes = useStyles()
  const [requests, setrequests] = useState([])

  useEffect(() => {
    getContactRequests(userId)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setrequests(contactRequests)
  }, [contactRequests])

  const deleteRequest = (cReqId) => {
    deleteContactRequest(userId, cReqId)
  }

  const acceptRequest = (cReqId) => {
    acceptContactRequest(userId, cReqId)
    console.log("Accepting " + cReqId)
  }

  return (
    <List dense className={classes.root}>
      <ListSubheader>Contact Requests</ListSubheader>
      {requests.map((item) => {
        return (
          <ListItem key={item.id} button>
            <ListItemAvatar>
              <Avatar>{item.username[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.username} />
            <ListItemSecondaryAction>
              <IconButton
                color="secondary"
                onClick={() => deleteRequest(item.id)}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                color="primary"
                onClick={() => acceptRequest(item.id)}
              >
                <Check />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )
      })}
    </List>
  )
}

export default NotificationPop
