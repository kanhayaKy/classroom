import React, { useEffect } from "react";
import { makeStyles,useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ClassIcon from '@material-ui/icons/Class';
import { red } from "@material-ui/core/colors";
import { useHistory } from "react-router-dom";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    backgroundColor: red[500],
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function CustomAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const theme = useTheme();
  const [OpenDraw, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    handleClose();
  }, [props.logged_in]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleDrawerOpen}
            aria-label="open drawer"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            {props.logged_in &&<MenuIcon />}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Button onClick={() => history.push("/")} color="inherit">
              {props.Navtitle}
            </Button>{" "}
          </Typography>
          {props.logged_in && (
            <div>
              <Button color="inherit">
                {props.addComponent}
              </Button>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {props.user.username ? props.user.username[0] : null}
                </Avatar>{" "}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>{props.user.username}</MenuItem>
                <MenuItem onClick={() => history.push("/logout")}>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}

          {!props.logged_in && (
            <div>
              <Button onClick={() => history.push("/login")} color="inherit">
                Login
              </Button>
              <Button onClick={() => history.push("/register")} color="inherit">
                Register
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {props.logged_in && (

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={OpenDraw}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
        
        </List>
        <Divider />
        <List>
          {props.classes.map((classRoom, index) => (
            <ListItem button onClick={() => {history.push(`/class/${classRoom.id}`); window.location.reload()}} key={index}>
              <ListItemIcon><ClassIcon/></ListItemIcon>
              <ListItemText primary={classRoom.Title} />
            </ListItem>
          ))}
        </List>
      </Drawer>)}
      <Toolbar />
    </div>
  );
}
