import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { makeStyles } from "@material-ui/core/styles"
import { deepPurple } from "@material-ui/core/colors"
import AccountCircle from "@material-ui/icons/AccountCircle"
import AddCircleOutlineRounded from "@material-ui/icons/AddCircleOutlineRounded"
import ContactsTwoTone from "@material-ui/icons/ContactsTwoTone"

import {
  Grid,
  List,
  Menu,
  AppBar,
  Hidden,
  Toolbar,
  Tooltip,
  ListItem,
  MenuItem,
  Typography,
  IconButton,
} from "@material-ui/core"

import ContactItem from "./contacts/ContactItem"
import ContactDialog from "./contacts/ContactDialog"
import AddFormDialog from "./contacts/AddFormDialog"
import MessageBox from "./Messages/MessageBox"

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    height: "100vh",
    padding: theme.spacing(3),
  },
  appBar: {
    color: "black",
    background: "transparent",
    boxShadow: "none",
  },
  tool: {
    display: "flex",
    alignItems: "center",
  },
  list: {
    marginTop: "10px",
    maxHeight: "85vh",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      appearance: "none",
      height: 0,
    },
  },
  listItem: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    border: `1px solid ${deepPurple.A200}`,
  },
  contacts: {
    maxWidth: "45ch",
  },
  messages: {
    flexGrow: 1,
  },
}))

function MessagingHome(props) {
  const classes = useStyles()
  const [state, setState] = React.useState({
    MenuEleTxt: null,
    isDialogOpen: false,
    openFormDialog: false,
    selectedUsername: "",
    isAddNewContact: true,
  })
  // const { user } = props.auth
  const usersList = ["user01", "user02"]

  const openContactFunc = () => {
    setState({ ...state, isDialogOpen: true })
  }

  const closeContactFunc = (value) => {
    setState({ ...state, isDialogOpen: false, selectedUsername: value })
  }

  const openFormFunc = (isOpenNewContact) => {
    setState({
      ...state,
      openFormDialog: true,
      isAddNewContact: isOpenNewContact,
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
    <main className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant="dense">
          <Grid container spacing={2}>
            <Grid item xs={9} sm={10} md={11} className={classes.tool}>
              <Typography className={classes.title} variant="h6" noWrap>
                {state.selectedUsername}
              </Typography>
            </Grid>
            <Grid item xs={3} sm={2} md={1} className={classes.tool}>
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
            <List className={classes.list}>
              {usersList.map((email) => (
                <div key={email} style={{ margin: "5px", padding: "10px" }}>
                  <ListItem
                    onClick={() =>
                      setState({ ...state, selectedUsername: email })
                    }
                    alignItems="flex-start"
                    className={classes.listItem}
                  >
                    <ContactItem />
                  </ListItem>
                </div>
              ))}
            </List>
          </Hidden>
        </Grid>
        <Grid item className={classes.messages}>
          <MessageBox />
        </Grid>
      </Grid>
      <ContactDialog
        selectedValue={state.selectedUsername}
        open={state.isDialogOpen}
        onClose={closeContactFunc}
        usersList={usersList}
        openForm={openFormFunc}
      />
      <AddFormDialog
        open={state.openFormDialog}
        isAddNewContact={state.isAddNewContact}
        onClose={closeFormFunc}
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
            openFormFunc(true)
          }}
        >
          Add New Contact
        </MenuItem>
        <MenuItem
          onClick={() => {
            CloseMenu()
            openFormFunc(false)
          }}
        >
          Create A Group
        </MenuItem>
      </Menu>
    </main>
  )
}

MessagingHome.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, {})(MessagingHome)
