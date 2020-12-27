import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "@material-ui/core/Avatar";
// import AccountCircle from "@material-ui/icons/AccountCircle";
// import Switch from "@material-ui/core/Switch";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import { red } from "@material-ui/core/colors";
import CreateClassForm from "./../Components/CreateJoinClassForm.js";

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
}));

export default function CustomAppBar(props) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(props.logged_in);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  useEffect(() => {
    if (props.logged_in !== auth) {
      setAuth(props.logged_in);
    }
  }, [props.logged_in]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      {/* <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? "Logout" : "Login"}
        />
      </FormGroup> */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          <Button
                onClick={() => props.display_page("home")}
                color="inherit"
              >
                Classroom
              </Button>          </Typography>
          {auth && (
            <div>
              <Button color="inherit">
                {" "}
                <CreateClassForm
                  userId={props.userId}
                  isFaculty={props.isFaculty}
                  ClassRoomAdded={props.ClassRoomAdded}
                />{" "}
              </Button>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {props.username ? props.username[0] : null}
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
                <MenuItem onClick={handleClose}>{props.username}</MenuItem>
                <MenuItem onClick={props.handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}

          {!auth && (
            <div>
              <Button
                onClick={() => props.display_page("login")}
                color="inherit"
              >
                Login
              </Button>
              <Button
                onClick={() => props.display_page("register")}
                color="inherit"
              >
                Register
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
