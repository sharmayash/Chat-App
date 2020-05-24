import React from "react"
import PropTypes from "prop-types"

import { makeStyles } from "@material-ui/core/styles"
import { Grid, Paper, Typography, Avatar } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}))

function MessageItem(props) {
  const classes = useStyles()

  return (
    <Grid item>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs>
            <Typography>{props.message}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

MessageItem.propTypes = {
  message: PropTypes.string.isRequired,
}

export default MessageItem
