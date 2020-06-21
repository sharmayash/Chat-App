import PropTypes from "prop-types"
import { connect } from "react-redux"
import { useSnackbar } from "notistack"
import React, { useEffect, useState, useRef } from "react"
import { newMsg } from "../../../../redux/actions/chatActions"

import {
  Grid,
  Paper,
  Tooltip,
  TextField,
  IconButton,
  Typography,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { deepPurple } from "@material-ui/core/colors"
import SendRounded from "@material-ui/icons/SendRounded"
import VideoCallTwoTone from "@material-ui/icons/VideoCallTwoTone"

import { VideoDialog } from "../video/VideoDialog"

const useStyles = makeStyles((theme) => ({
  root: {
    height: "83vh",
    "&::-webkit-scrollbar": {
      appearance: "none",
      height: 0,
    },
  },
  chatBox: {
    height: "70vh",
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
    margin: "5px",
    padding: "10px",
    maxWidth: "40ch",
    display: "inline-block",
    borderRadius: "10px",
  },
}))

function MessageBox(props) {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const [msgValue, setMsgValue] = useState("")
  const { socket, newMsg, chat } = props
  const { currentRoom } = chat

  // For video dialog

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // For scrolling to most recent message

  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [chat.chats])

  // For Receiveing new Msg.

  useEffect(() => {
    if (socket) {
      socket.on("newMsg", (data) => {
        newMsg(currentRoom, data)
      })
      return () => {
        socket.off("newMsg")
      }
    }
  }, [socket, currentRoom, newMsg])

  // For Notification

  useEffect(() => {
    if (socket) {
      socket.on("notification", (data) => {
        enqueueSnackbar(data.message, { variant: data.type })
      })
      return () => {
        socket.off("notification")
      }
    }
  }, [socket, enqueueSnackbar])

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
    var msgEL = {
      text: msgValue,
      timestamp: dateTime,
      userId: props.auth.user.id,
      username: props.auth.user.username,
      roomName: props.chat.currentRoom,
    }

    socket.emit("sendMsg", msgEL)
    setMsgValue("")
  }

  let chatBubbles

  if (chat.currentRoom === "") {
    chatBubbles = <h5>Select A Chat Room</h5>
  } else if (chat.chats.length === 0) {
    chatBubbles = <h5>No Chats in this Room</h5>
  } else if (chat.chats.length > 0) {
    chatBubbles = chat.chats.map((chat, i) =>
      chat.sender.username === props.auth.user.username ? (
        <div key={i} className={`${classes.bubbleContainer} right`}>
          <Paper
            className={classes.bubble}
            elevation={3}
            style={{ backgroundColor: "#dcedc8" }}
          >
            <Typography>{chat.message}</Typography>
          </Paper>
        </div>
      ) : (
        <div key={i} className={`${classes.bubbleContainer} left`}>
          <Paper
            className={classes.bubble}
            elevation={3}
            style={{ backgroundColor: deepPurple[200] }}
          >
            <Typography>{chat.message}</Typography>
          </Paper>
        </div>
      )
    )
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
        {currentRoom ? (
          <Grid item container direction="row">
            <Grid item xs style={{ flexGrow: 1 }}>
              <Typography variant="subtitle2">{currentRoom}</Typography>
            </Grid>
            <Tooltip title="Video Chat">
              <IconButton color="inherit" onClick={handleClickOpen}>
                <VideoCallTwoTone />
              </IconButton>
            </Tooltip>
          </Grid>
        ) : null}
        <Grid item className={classes.chatBox}>
          {chatBubbles}
          <div ref={messagesEndRef} />
        </Grid>
        <Grid item>
          <form onSubmit={sendMessage}>
            <Grid container direction="row" justify="center">
              <Grid item style={{ flexGrow: 1 }}>
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
              <Grid item>
                <IconButton type="submit">
                  <SendRounded />
                </IconButton>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
      <VideoDialog isOpen={open} handleClose={handleClose} />
    </div>
  )
}

MessageBox.propTypes = {
  auth: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
  newMsg: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat,
})

export default connect(mapStateToProps, { newMsg })(MessageBox)
