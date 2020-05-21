import React from "react"

import Avatar from "@material-ui/core/Avatar"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import { deepPurple } from "@material-ui/core/colors"

export default function ContactItem() {
  return (
    <div style={{ margin: "5px", padding: "10px" }}>
      <ListItem
        alignItems="flex-start"
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          border: `1px solid ${deepPurple.A200}`,
        }}
      >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="icon.png" />
        </ListItemAvatar>
        <ListItemText
          primary="Ali Connors"
          secondary={" I'll be in your neighborhood doing errands this…"}
        />
      </ListItem>
    </div>
  )
}
