import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import CloseIcon from "@material-ui/icons/Close"
import { makeStyles } from "@material-ui/core/styles"

import {
  Slide,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: "transparent",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}))
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export const VideoDialog = ({ isOpen, handleClose }) => {
  const classes = useStyles()
  const closeDialog = () => {
    handleClose(false)
  }

  return (
    <Dialog
      fullScreen
      open={isOpen}
      PaperProps={{
        style: {
          opacity: "0.7",
          backgroundColor: "black",
          color: "white",
          boxShadow: "none",
        },
      }}
      onClose={closeDialog}
      TransitionComponent={Transition}
    >
      <AppBar elevation={0} className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={closeDialog}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Video Chat
          </Typography>
          <Button autoFocus color="inherit" onClick={closeDialog}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <h1>Video Chat</h1>
    </Dialog>
  )
}

VideoDialog.propTypes = {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(VideoDialog)
