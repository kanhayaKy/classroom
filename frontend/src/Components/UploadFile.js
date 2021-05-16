import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ListItemText from "@material-ui/core/ListItemText";

import SERVER_ADDRESS from "../config";
const base_url = SERVER_ADDRESS;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  card: {
    margin: "auto 0",
    float: "right",
  },
  margin: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
  heading: {
    fontSize: theme.typography.pxToRem(25),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function CreateMaterial(props) {
  const classes = useStyles();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState(null);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let form_data = new FormData();
    image
      ? form_data.append("Content", image, image.name)
      : form_data.append("Content", "");
    form_data.append("Title", title);
    form_data.append("Description", description);
    form_data.append("classroom", [props.classroom]);
    let url = base_url + "material/";
    axios
      .post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        props.newMaterial();
        resetForm();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Accordion className={classes.margin}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Create New </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleSubmit}>
            <div className={classes.margin}>
              {" "}
              <TextField
                id="standard-basic"
                label="Title"
                value={title}
                onChange={handleTitle}
                required
              />
            </div>
            <div className={classes.margin}>
              {" "}
              <TextField
                id="standard-basic"
                label="Description"
                value={description}
                onChange={handleDescription}
                required
              />
            </div>
            <div className={classes.margin}>
              <Button
                variant="contained"
                startIcon={<CloudUploadIcon />}
                component="label"
              >
                Upload File
                <input
                  type="file"
                  accept="image/png, image/jpeg , application/pdf, application/vnd.ms-excel "
                  onChange={handleImageChange}
                  key={image}
                  hidden
                />
              </Button>
            </div>
            {image ? (
              <div className="contentBox">
                <p>Choosen File(s)</p>
                <ListItemText primary={image.name} />
              </div>
            ) : null}

            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.card}
            >
              Create
            </Button>
          </form>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
