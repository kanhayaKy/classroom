import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Container from "@material-ui/core/Container";
import CustomNavBar from "./../Components/NavBar.js";
import UploadFile from "./UploadFile";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import SERVER_ADDRESS from "../config";
import { useParams } from "react-router-dom";
import pdfThumbnail from "../Images/pdfThumbnail.png";
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
  card: {
    margin: "2.5rem",
    opacity: "0",
  },

  margin: {
    margin: theme.spacing(2),
  },
  title: {
    fontSize: theme.typography.pxToRem(70),
    color: "white",
    padding: "3rem",
  },
  height: {
    margin: "1rem 0",
    display: "flex",
    flexDirection: "column",
  },
  filePreview: {
    display: "block",
    margin: "1rem",
  },
  topCard: {
    backgroundColor:"#3f51b5",
    borderRadius:"2rem",
    height: "25vh",
    maxWidth: "45%",
    margin: "6vh auto",
    textAlign:"center",
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  fileCard: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
}));

export default function ControlledAccordions(props) {
  const classes = useStyles();
  const [classDetail, setClassDetail] = React.useState({});
  const [expanded, setExpanded] = React.useState(false);
  const { id } = useParams();

  useEffect(() => {
    classRoomDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onpenFile = (url) => {
    window.open(base_url + url);
  };

  const renderMaterials = () => {
    if (classDetail.materials?.length>0) {
      const materials = classDetail.materials
        .slice(0)
        .reverse()
        .map((material, i) => (
          <Accordion
            className={classes.height}
            expanded={expanded === `panel${i}`}
            onChange={handleChange(`panel${i}`)}
            key={i}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${i}bh-content`}
              id={`panel${i}bh-header`}
            >
              <Typography className={classes.heading}>
                {material.Title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <Typography className={classes.secondaryHeading}>
                {material.Description}
              </Typography>
              {material.Content && (
                <div onClick={() => onpenFile(material.Content)}>
                  <Card className={classes.fileCard}>
                    <div className={classes.details}>
                      <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                          {material.Title}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="textSecondary"
                        ></Typography>
                      </CardContent>
                    </div>
                    <CardMedia
                      className={classes.cover}
                      image={
                        material.Content.slice(-3) === "pdf"
                          ? pdfThumbnail
                          : base_url + material.Content
                      }
                      title={material.Description}
                    />
                  </Card>
                </div>
              )}
            </AccordionDetails>
          </Accordion>
        ));

      return materials;
    } else {
      return (
        <Accordion disabled>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Nothing yet</Typography>
          </AccordionSummary>
        </Accordion>
      );
    }
  };

  const classRoomDetails = () => {
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
      .then((classDetails) => {
        if (classDetails.detail === "Not found")
          console.log(classDetails.detail);
        setClassDetail(classDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <CustomNavBar
        Navtitle={classDetail.Title}
        logged_in={props.logged_in}
        classes={props.classes}
        user={props.user}
      />
      <Container className={classes.topCard} maxWidth="md">
        <Typography variant="h3" component="h4" className={classes.title}>
          {classDetail.Title}
        </Typography>
      </Container>

      <Container className={classes.root} maxWidth="sm">
        {props.isFaculty && (
          <UploadFile
            classroom={classDetail.id}
            newMaterial={() => classRoomDetails()}
          />
        )}
        <Divider variant="inset" className={classes.card} />
        {renderMaterials()}
      </Container>
    </>
  );
}
