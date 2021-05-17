import React, { Component } from "react";
import CustomNavBar from "./Components/NavBar.js";
import LoginForm from "./Components/Accounts/LoginUser";
import RegisterForm from "./Components/Accounts/RegisterUser";
import Classroom from "./Components/Classroom";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Components/Home";
import CreateClassForm from "./Components/CreateJoinClassForm.js";
import ErrorPage from "./Components/pageNotFound.js";

import SERVER_ADDRESS from "./config";

import "./App.css";

const base_url = SERVER_ADDRESS;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logged_in: localStorage.getItem("token") ? true : false,
      user: {},
      classes: [],
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch(base_url + "current_user/", {
        method: "GET",
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((resp) => {
          this.setState({
            user: resp,
          });
          this.getClasses();
        })
        .catch((err) => console.log(err));
    }
  }

  //Authentication functions

  handleLogout = () => {
    localStorage.removeItem("token");
    this.setState({ logged_in: false, username: "" });
    return <Redirect to="/" />;
  };

  handleLogin = (e, data) => {
    e.preventDefault();
    fetch(base_url + "token-auth/", {
      crossDomain: true,
      withCredentials: true,
      async: true,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        localStorage.setItem("token", json.token);
        this.setState({
          logged_in: true,
          user: json.user,
        });
        this.getClasses();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Get All the classes of the current user
  getClasses = () => {
    if (this.state.logged_in) {
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
          this.setState({
            classes: [...resp],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    const { logged_in, user } = this.state;
    return (
      <div>
        <Switch>
          <Route exact path="/">
            {this.state.logged_in&&(this.state.user!=='undefined') ? (
              <div>
                <CustomNavBar
                  logged_in={logged_in}
                  user={this.state.user}
                  Navtitle="Classroom"
                  classes={this.state.classes}
                  addComponent={
                    <CreateClassForm
                      userId={user.id}
                      isFaculty={user.Role === "TR" ? true : false}
                      ClassRoomAdded={this.getClasses}
                    />
                  }
                />
                <Home
                  logged_in={this.state.logged_in}
                  user={this.state.user}
                  classes={this.state.classes}
                />
              </div>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route path="/register">
            {this.state.logged_in ? (
              <Redirect to="/" />
            ) : (
              <React.Fragment>
                <CustomNavBar Navtitle="Classroom" />

                <RegisterForm history={this.history} />
              </React.Fragment>
            )}
          </Route>

          <Route path="/login">
            {this.state.logged_in ? (
              <Redirect to="/" />
            ) : (
              <React.Fragment>
                <CustomNavBar Navtitle="Classroom" />
                <LoginForm handleLogin={this.handleLogin} />
              </React.Fragment>
            )}
          </Route>

          <Route path="/logout">{this.handleLogout}</Route>

          <Route path="/class/:id">
            <Classroom
              logged_in={logged_in}
              user={this.state.user}
              classes={this.state.classes}
              isFaculty={user.Role === "TR" ? true : false}
            />
          </Route>

          <Route render={() => <ErrorPage />} />
        </Switch>
      </div>
    );
  }
}

export default App;
