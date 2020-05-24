import React from "react"

import Avatar from "@material-ui/core/Avatar"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"

export default function ContactItem() {
  return (
    <>
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src="icon.png" />
      </ListItemAvatar>
      <ListItemText
        primary="Ali Connors"
        secondary={" I'll be in your neighborhood doing errands this…"}
      />
    </>
  )
}
