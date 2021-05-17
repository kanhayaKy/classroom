import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import SERVER_ADDRESS from "../config";

const base_url = SERVER_ADDRESS;

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const createClassroom = () => {
    fetch(base_url + "classes/", {
      crossDomain: true,
      withCredentials: true,
      async: true,
      method: "POST",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        Title: input,
        IsActive: true,
        Faculty: props.userId,
        Students: [],
        Materials: [],
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setInput("");
        props.ClassRoomAdded();
      })
      .catch((err) => {
        console.log(err);
      });

    handleClose();
  };

  const joinClassroom = () => {
    fetch(base_url + `classes/${input}`, {
      crossDomain: true,
      withCredentials: true,
      async: true,
      method: "PATCH",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        Students: [props.userId],
      }),
    })
      .then(() => {
        props.ClassRoomAdded();
      })
      .catch((err) => {
        console.log(err);
      });

    handleClose();
  };

  return (
    <div>
      <Button
        size="large"
        color="inherit"
        onClick={handleClickOpen}
      >
        <AddIcon size="large" />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {props.isFaculty && <React.Fragment>Create</React.Fragment>}
          {!props.isFaculty && <React.Fragment>Join</React.Fragment>}{" "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            value={input}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {props.isFaculty && (
            <Button onClick={createClassroom} color="primary">
              Create
            </Button>
          )}
          {!props.isFaculty && (
            <Button onClick={joinClassroom} color="primary">
              Join
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
