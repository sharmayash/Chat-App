import React, { useState } from "react"
// import PropTypes from "prop-types"

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
// import MessageItem from "./MessageItem"

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

  const dummyData = [
    {
      message: "1: This should be in left",
      direction: "left",
    },
    {
      message:
        "2: This should be in right This should be in right This should be in right This should be in right This should be in right",
      direction: "right",
    },
    {
      message:
        "3: This should be in left again This should be in left again This should be in left again This should be in left again This should be in left again",
      direction: "left",
    },
    {
      message: "4: This should be in right again",
      direction: "right",
    },
    {
      message: "5: This should be in left again",
      direction: "left",
    },
    {
      message: "6: This should be in right again",
      direction: "right",
    },
    {
      message: "7: This should be in left again",
      direction: "left",
    },
    {
      message: "8: This should be in right again",
      direction: "right",
    },
  ]

  const chatBubbles = dummyData.map((obj, i = 0) => (
    <div className={`${classes.bubbleContainer} ${obj.direction}`} key={i}>
      <Paper key={i++} className={classes.bubble} elevation={3}>
        <Typography>{obj.message}</Typography>
      </Paper>
    </div>
  ))

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
              <IconButton>
                <SendRounded />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

MessageBox.propTypes = {}

export default MessageBox
