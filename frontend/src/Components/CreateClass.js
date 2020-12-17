import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from '@material-ui/icons/Add';
import SERVER_ADDRESS from './../config';

const base_url = SERVER_ADDRESS
export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  console.log(props.userId)
  const [title, setTitle] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setTitle(event.target.value);
    console.log(title)
  };

  const createClassroom = () => {
    console.log(userId)
    fetch(base_url + "classes/", {
      crossDomain: true,
      withCredentials: true,
      async: true,
      method: "POST",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        "Title": title ,
        "IsActive": true,
        "Faculty": props.userId,
        "Students": [],
        "Materials": []
      })
    })
      .then((res) => res.json())
      .then(()  => {
        setTitle("");
        props.created();
      })
      .catch((err) => {
        console.log(err);
      });

      handleClose();
      
  };

  return (
    <div>
      <Button variant="circular" borderRadius="50%" size="large" color="inherit" onClick={handleClickOpen}>
        <AddIcon size="large"/>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the title of the classroom
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            value={title}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createClassroom} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
