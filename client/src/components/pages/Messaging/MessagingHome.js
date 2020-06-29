import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import socketIOClient from "socket.io-client"
import { SnackbarProvider } from "notistack"
import {
  getContactRequests,
  deleteContactRequest,
} from "../../../redux/actions/authActions"

import { makeStyles } from "@material-ui/core/styles"
import AccountCircle from "@material-ui/icons/AccountCircle"
import ContactsTwoTone from "@material-ui/icons/ContactsTwoTone"
import AddCircleOutlineRounded from "@material-ui/icons/AddCircleOutlineRounded"
import NotificationImportantRounded from "@material-ui/icons/NotificationImportantRounded"

import {
  Grid,
  List,
  Menu,
  AppBar,
  Hidden,
  Toolbar,
  Tooltip,
  MenuItem,
  Typography,
  IconButton,
  Popover,
} from "@material-ui/core"

import RoomBox from "./contacts/RoomBox"
import MessageBox from "./Messages/MessageBox"
import AddFormDialog from "./contacts/AddFormDialog"
import ContactDialog from "./contacts/ContactDialog"
import { NotificationPop } from "../../common/NotificationPop"

const useStyles = makeStyles((theme) => ({
  growHome: {
    flexGrow: 1,
    height: "100vh",
    padding: theme.spacing(3),
  },
  appBar: {
    color: "black",
    background: "transparent",
    boxShadow: "none",
  },
  list: {
    marginTop: "10px",
    maxHeight: "80vh",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      appearance: "none",
      height: 0,
    },
  },
  contacts: {
    maxWidth: "45ch",
  },
  grow: {
    flexGrow: 1,
  },
}))

function MessagingHome(props) {
  const classes = useStyles()
  const [socket, setSocket] = useState(null)
  const [state, setState] = useState({
    anchorEl: null,
    MenuEleTxt: null,
    isDialogOpen: false,
    openFormDialog: false,
    isAddNewContact: true,
    joinORcreate: null,
  })

  useEffect(() => {
    setSocket(socketIOClient.connect("http://localhost:4000"))
  }, [])

  const { user, contactRequests } = props.auth
  const open = Boolean(state.anchorEl)
  const id = open ? "simple-popover" : undefined

  const handlePopOver = (event) => {
    setState({ ...state, anchorEl: event.currentTarget })
  }

  const closePopOver = () => {
    setState({ ...state, anchorEl: null })
  }

  const openContactFunc = () => {
    setState({ ...state, isDialogOpen: true })
  }

  const closeContactFunc = (value) => {
    setState({ ...state, isDialogOpen: false })
  }

  const openFormFunc = (isOpenNewContact, joinORcreate) => {
    setState({
      ...state,
      openFormDialog: true,
      isAddNewContact: isOpenNewContact,
      joinORcreate: joinORcreate,
    })
  }

  const closeFormFunc = () => {
    setState({ ...state, openFormDialog: false })
  }

  const openMenuFunc = (event) => {
    setState({ ...state, MenuEleTxt: event.currentTarget })
  }

  const CloseMenu = () => {
    setState({ ...state, MenuEleTxt: null })
  }

  return (
    <main className={classes.growHome}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant="dense">
          <Grid container spacing={2}>
            <Grid item className={classes.grow}>
              <Typography className={classes.title} variant="h6" noWrap>
                Messaging
              </Typography>
            </Grid>
            <Grid item>
              <Hidden only={["md", "lg", "xl"]}>
                <Tooltip title="Contacts">
                  <IconButton color="inherit" onClick={openContactFunc}>
                    <ContactsTwoTone />
                  </IconButton>
                </Tooltip>
              </Hidden>
              <Hidden only={["xs", "sm"]}>
                <Tooltip title="Add New Contact / Group">
                  <IconButton color="inherit" onClick={openMenuFunc}>
                    <AddCircleOutlineRounded />
                  </IconButton>
                </Tooltip>
              </Hidden>
              <Tooltip title="Notifications">
                <IconButton
                  aria-describedby={id}
                  color="inherit"
                  onClick={handlePopOver}
                >
                  <NotificationImportantRounded />
                </IconButton>
              </Tooltip>
              <Tooltip title="Your Profile">
                <IconButton color="inherit">
                  <AccountCircle />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item className={classes.contacts}>
          <Hidden only={["xs", "sm"]}>
            <Typography
              variant="subtitle2"
              style={{ marginLeft: "20px", marginRight: "20px" }}
            >
              Chat Rooms
            </Typography>
            <List className={classes.list}>
              <RoomBox
                userId={user.id}
                username={user.username}
                socket={socket}
              />
            </List>
          </Hidden>
        </Grid>
        {props.room.rooms.length > 0 ? (
          <Grid item className={classes.grow}>
            <SnackbarProvider maxSnack={3} dense preventDuplicate>
              <MessageBox socket={socket} />
            </SnackbarProvider>
          </Grid>
        ) : null}
      </Grid>
      <ContactDialog
        socket={socket}
        userId={user.id}
        openForm={openFormFunc}
        open={state.isDialogOpen}
        onClose={closeContactFunc}
      />
      <AddFormDialog
        socket={socket}
        userId={user.id}
        username={user.username}
        onClose={closeFormFunc}
        open={state.openFormDialog}
        joinORcreate={state.joinORcreate}
        isAddNewContact={state.isAddNewContact}
      />
      <Menu
        id="simple-menu"
        anchorEl={state.MenuEleTxt}
        keepMounted
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(state.MenuEleTxt)}
        onClose={CloseMenu}
      >
        <MenuItem
          onClick={() => {
            CloseMenu()
            openFormFunc(true, null)
          }}
        >
          Add New Contact
        </MenuItem>
        <MenuItem
          onClick={() => {
            CloseMenu()
            openFormFunc(false, "join")
          }}
        >
          Join Group
        </MenuItem>
        <MenuItem
          onClick={() => {
            CloseMenu()
            openFormFunc(false, "create")
          }}
        >
          Create A Group
        </MenuItem>
      </Menu>
      <Popover
        id={id}
        open={open}
        anchorEl={state.anchorEl}
        onClose={closePopOver}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <NotificationPop
          userId={user.id}
          getContactRequests={props.getContactRequests}
          deleteContactRequest={props.deleteContactRequest}
          contactRequests={contactRequests}
        />
      </Popover>
    </main>
  )
}

MessagingHome.propTypes = {
  auth: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired,
  getContactRequests: PropTypes.func.isRequired,
  deleteContactRequest: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  room: state.room,
})

const mapDispatchToProps = { getContactRequests, deleteContactRequest }

export default connect(mapStateToProps, mapDispatchToProps)(MessagingHome)
