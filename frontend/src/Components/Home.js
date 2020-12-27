import React from "react";
import ClassCard from "./classcard";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },

  gridGutter: {
    alignItems: "center",
  },
});

function CardList(props) {
  const classes = useStyles();
  const classrooms = props.classrooms;
  const classeslist = classrooms.map((classroom, i) => (
    <Grid item xs={12} sm={6} md={4}>
      <ClassCard className={classes.root} class={classroom} key={i} displayPage ={(param) =>props.displayPage(param)}/>
    </Grid>
  ));
  return (
    <Grid 
      align-content-s-center
      className={classes.gridGutter}
      container
      spacing={2}
    >
      {" "}
      {classeslist}{" "}
    </Grid>
  );
}

function Home(props) {
  return (
    <Container>
      <h1>Welcome {props.username}</h1>

      {props.logged_in && <CardList classrooms={props.classes}  displayPage ={(param) =>{console.log("passed it to home container", param);props.displayPage(param)}} />}
    </Container>
  );
}

export default Home;
