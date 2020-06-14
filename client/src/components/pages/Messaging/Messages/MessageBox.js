import PropTypes from "prop-types"
import { connect } from "react-redux"
import React, { useEffect, useState, useRef } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { deepPurple } from "@material-ui/core/colors"
import SendRounded from "@material-ui/icons/SendRounded"
import { newMsg } from "../../../../redux/actions/chatActions"
import {
  TextField,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    height: "83vh",
    "&::-webkit-scrollbar": {
      appearance: "none",
      height: 0,
    },
  },
  chatBox: {
    height: "74vh",
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
  const [msgValue, setMsgValue] = useState("")
  const { socket, newMsg, chat } = props

  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [chat.chats])

  useEffect(() => {
    if (socket) {
      socket.on("newMsg", async (data) => {
        await newMsg(chat.currentRoom, data)
      })
    }
  }, [socket])

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

  if (chat.chats.length > 0) {
    chatBubbles = chat.chats.map((chat) =>
      chat.sender.username === props.auth.user.username ? (
        <div className={`${classes.bubbleContainer} right`} key={chat.id}>
          <Paper
            className={classes.bubble}
            elevation={3}
            style={{ backgroundColor: "#dcedc8" }}
          >
            <Typography>{chat.message}</Typography>
          </Paper>
        </div>
      ) : (
        <div className={`${classes.bubbleContainer} left`} key={chat.id}>
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
        <Grid item>
          <Typography variant="subtitle2">{chat.currentRoom}</Typography>
        </Grid>
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
