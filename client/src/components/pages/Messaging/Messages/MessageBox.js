import PropTypes from "prop-types"
import { connect } from "react-redux"
import React, { useState } from "react"

import { makeStyles } from "@material-ui/core/styles"
import SendRounded from "@material-ui/icons/SendRounded"
import {
  TextField,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core"
import { deepPurple } from "@material-ui/core/colors"

const useStyles = makeStyles((theme) => ({
  root: {
    height: "83vh",
    "&::-webkit-scrollbar": {
      appearance: "none",
      height: 0,
    },
  },
  chatBox: {
    height: "78vh",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      appearance: "none",
      height: 0,
    },
  },
  bubbleContainer: {
    width: "100%",
    display: "flex",
    //check style.css for left and right classnaeme based on your data
  },
  bubble: {
    maxWidth: "40ch",
    border: `2px solid ${deepPurple.A200}`,
    borderRadius: "10px",
    margin: "5px",
    padding: "10px",
    display: "inline-block",
  },
}))

function MessageBox(props) {
  const classes = useStyles()
  const [msgValue, setMsgValue] = useState("")

  const handleChange = (e) => {
    setMsgValue(e.target.value)
  }

  const sendMessage = (e) => {
    e.preventDefault()
    if (!msgValue) {
      return
    }

    var today = new Date()
    var date = `${today.getMonth() + 1}/${today.getDate()}`
    var time = `${today.getHours()}:${today.getMinutes()}`
    var dateTime = `⏲ ${time} 📆 ${date}`

    props.socket.emit("sendMsg", {
      text: msgValue,
      timestamp: dateTime,
      userId: props.auth.user.id,
      username: props.auth.user.username,
      roomName: props.chat.currentRoom,
    })
  }

  let chatBubbles

  if (props.chat.chats.length > 0) {
    chatBubbles = props.chat.chats.map((chat) =>
      chat.sender.username === props.auth.user.username ? (
        <div className={`${classes.bubbleContainer} right`} key={chat.id}>
          <Paper className={classes.bubble} elevation={3}>
            <Typography>{chat.message}</Typography>
          </Paper>
        </div>
      ) : (
        <div className={`${classes.bubbleContainer} left`} key={chat.id}>
          <Paper className={classes.bubble} elevation={3}>
            <Typography>{chat.message}</Typography>
          </Paper>
        </div>
      )
    )
  } else {
    chatBubbles = <h1>No Chats</h1>
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justify="flex-end"
        alignItems="stretch"
        spacing={2}
      >
        <Grid item className={classes.chatBox}>
          {chatBubbles}
        </Grid>
        <Grid item>
          <form onSubmit={sendMessage}>
            <Grid container direction="row" justify="center">
              <Grid item xs={11}>
                <TextField
                  required
                  margin="dense"
                  name="aMsg"
                  value={msgValue}
                  onChange={handleChange}
                  label="Type your Message Here"
                  type="text"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton type="submit">
                  <SendRounded />
                </IconButton>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  )
}

MessageBox.propTypes = {
  auth: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat,
})

export default connect(mapStateToProps, {})(MessageBox)
