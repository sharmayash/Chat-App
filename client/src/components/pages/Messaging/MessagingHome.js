import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { makeStyles } from "@material-ui/core/styles"
import { deepPurple } from "@material-ui/core/colors"
import AccountCircle from "@material-ui/icons/AccountCircle"
import PersonAddRounded from "@material-ui/icons/PersonAddRounded"
import ContactsTwoTone from "@material-ui/icons/ContactsTwoTone"

import {
  Grid,
  List,
  AppBar,
  Hidden,
  Toolbar,
  ListItem,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core"

import ContactItem from "./contacts/ContactItem"
import ContactDialog from "./contacts/ContactDialog"
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
  const [isDialogOpen, setDialogOpen] = React.useState(false)
  const [selectedUsername, setSelectedValue] = React.useState("")
  // const { user } = props.auth
  const usersList = [
    "user01",
    "user02",
    "user1",
    "user1",
    "user1",
    "user1",
    "user1",
    "user1",
    "user1",
  ]

  const handleClickOpen = () => {
    setDialogOpen(true)
  }

  const handleClose = (value) => {
    setDialogOpen(false)
    setSelectedValue(value)
  }

  return (
    <main className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant="dense">
          <Grid container spacing={2}>
            <Grid item xs={9} sm={10} md={11} className={classes.tool}>
              <Typography className={classes.title} variant="h6" noWrap>
                {selectedUsername}
              </Typography>
            </Grid>
            <Grid item xs={3} sm={2} md={1} className={classes.tool}>
              <Hidden only={["md", "lg", "xl"]}>
                <Tooltip title="Contacts">
                  <IconButton color="inherit" onClick={handleClickOpen}>
                    <ContactsTwoTone />
                  </IconButton>
                </Tooltip>
              </Hidden>
              <Hidden only={["xs", "sm"]}>
                <Tooltip title="Add A Contact">
                  <IconButton color="inherit">
                    <PersonAddRounded />
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
                <div style={{ margin: "5px", padding: "10px" }}>
                  <ListItem
                    key={email}
                    onClick={() => setSelectedValue(email)}
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
        selectedValue={selectedUsername}
        open={isDialogOpen}
        onClose={handleClose}
        usersList={usersList}
      />
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
