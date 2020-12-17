import React from "react";
import ClassCard from "./classcard";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import SERVER_ADDRESS from "../config";

const base_url = SERVER_ADDRESS;
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
      <ClassCard className={classes.root} class={classroom} key={i} />
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

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.props.logged_in,
      classes: [],
    };
  }

  getClasses = () => {
    if (this.props.logged_in) {
      fetch(base_url + "classes/", {
        crossDomain: true,
        async: true,
        method: "GET",
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((resp) => {
          console.log(resp);
          this.setState({
            classes: [...resp],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.logged_in !== prevProps.logged_in) {
      this.getClasses();
    }
  }

  render() {
    console.log("printiing the logged in status", this.state.classes);
    return (
      <Container>
        <h1>Welcome {this.props.username}</h1>

        {this.props.logged_in && <CardList classrooms={this.state.classes} />}
      </Container>
    );
  }
}

export default Home;
