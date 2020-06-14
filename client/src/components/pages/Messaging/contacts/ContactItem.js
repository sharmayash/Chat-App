import React from "react"

import Avatar from "@material-ui/core/Avatar"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"

export default function ContactItem(props) {
  return (
    <>
      <ListItemAvatar>
        {/* <Avatar alt="Remy Sharp" src="icon.png" /> */}
        <Avatar>{props.roomName[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={props.roomName}
        secondary={" I'll be in your neighborhood doing"}
      />
    </>
  )
}
