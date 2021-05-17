import React from "react";
import ClassCard from "./classcard";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  heading: {
    margin: "2rem",
  },
});

function CardList(props) {
  const classes = useStyles();
  const classrooms = props.classrooms;
  const classeslist = classrooms.map((classroom, i) => (
    <Grid item xs={12} sm={6} md={3} key={i}>
      <ClassCard className={classes.root} class={classroom} />
    </Grid>
  ));
  return (
    <Grid container spacing={6}>
      {classeslist}
    </Grid>
  );
}

function Home(props) {
  const classes = useStyles();
  return (
    <Container fixed>
      <Typography variant="h2" gutterBottom className={classes.heading}>
        Welcome {props.user.username}{" "}
        <p style={{"font-size":"small"}}>Signed in as {props.user.Role === "ST"? "Student" : "Faculty"}</p>
      </Typography>

      <Container>
        {props.logged_in && <CardList classrooms={props.classes} />}
      </Container>
    </Container>
  );
}

export default Home;
