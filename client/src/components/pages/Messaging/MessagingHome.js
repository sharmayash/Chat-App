import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { makeStyles } from "@material-ui/core/styles"
import AccountCircle from "@material-ui/icons/AccountCircle"
import PersonAddRounded from "@material-ui/icons/PersonAddRounded"
import ContactsTwoTone from "@material-ui/icons/ContactsTwoTone"

import {
  Grid,
  List,
  AppBar,
  Hidden,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core"

import ContactItem from "./ContactItem"
import ContactDialog from "./ContactDialog"

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
    width: "100%",
    maxWidth: "45ch",
    marginTop: "10px",
    maxHeight: "85vh",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      appearance: "none",
      height: 0,
    },
  },
}))

function MessagingHome(props) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState("")
  const { user } = props.auth

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (value) => {
    setOpen(false)
    setSelectedValue(value)
  }

  return (
    <main className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant="dense">
          <Grid container spacing={2}>
            <Grid item xs={9} sm={10} md={11} className={classes.tool}>
              <Typography className={classes.title} variant="h6" noWrap>
                {selectedValue}
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
        justify="space-evenly"
        alignItems="baseline"
      >
        <Grid item md={4}>
          <Hidden only={["xs", "sm"]}>
            <List className={classes.list}>
              <ContactItem />
              <ContactItem />
              <ContactItem />
              <ContactItem />
              <ContactItem />
              <ContactItem />
              <ContactItem />
              <ContactItem />
            </List>
          </Hidden>
        </Grid>
        <Grid item md={8}>
          <h1>
            There is one limitation with the negative margin we use to implement
            the spacing between items. A horizontal scroll will appear if a
            negative margin goes beyond the There are 3 available
            workarounds:Not using the spacing feature and implementing it in
            user space spacing . Applying padding to the parent with at least
            half the spacing value applied to the child
          </h1>
        </Grid>
      </Grid>
      <ContactDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
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
