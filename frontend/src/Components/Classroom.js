import React , {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Container from "@material-ui/core/Container";
import CardMedia from "@material-ui/core/CardMedia";
import SERVER_ADDRESS from "../config";

// Props needed : classroom Id

const base_url = SERVER_ADDRESS;
const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  topCard: {
    backgroundColor: "#cfe8fc",
    height: "35vh",
    maxWidth: "70%",
    margin: "6vh auto",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ControlledAccordions(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [id , setId] = React.useState(props.id);

  useEffect(() => {
    console.log(
      "This only happens ONCE.  But it happens AFTER the initial render."
    );
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const openClassroom = () => {
    fetch(base_url + `classes/${id}`, {
      crossDomain: true,
      withCredentials: true,
      async: true,
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((classDetail) => {
        console.log(classDetail);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {openClassroom(1)}
      <Container className={classes.topCard} maxWidth="md">
        <Typography component="div" style={{}} />
        <CardMedia
          className={classes.media}
          image="../../static/Images/Fox in the Jungle.png"
          title="Paella dish"
        />
      </Container>
      <Container className={classes.root} maxWidth="sm">
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>
              General settings
            </Typography>
            <Typography className={classes.secondaryHeading}>
              I am an accordion
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
              feugiat. Aliquam eget maximus est, id dignissim quam.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Container>
    </>
  );
}
