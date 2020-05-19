import clsx from "clsx"
import React from "react"

import { makeStyles } from "@material-ui/core/styles"

import MenuIcon from "@material-ui/icons/Menu"
import MessageIcon from "@material-ui/icons/Message"
import BusinessIcon from "@material-ui/icons/Business"
import DashboardIcon from "@material-ui/icons/Dashboard"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import {
  List,
  Drawer,
  Divider,
  ListItem,
  CssBaseline,
  ListItemText,
} from "@material-ui/core"
import Home from "../pages/Home"

const drawerWidth = 200
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7) + 1,
    },
  },
}))

export default function OurDrawer() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <List>
          {open ? (
            <ListItem button key="Close" onClick={handleDrawerClose}>
              <ListItemIcon>
                <ChevronLeftIcon />
              </ListItemIcon>
              <ListItemText primary="Close" />
            </ListItem>
          ) : (
            <ListItem
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </ListItem>
          )}
          <Divider />
          <ListItem button key="Dashboard">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button key="Messaging">
            <ListItemIcon>
              <MessageIcon />
            </ListItemIcon>
            <ListItemText primary="Messaging" />
          </ListItem>
          <ListItem button key="CRM">
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="CRM" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Home />
    </div>
  )
}
