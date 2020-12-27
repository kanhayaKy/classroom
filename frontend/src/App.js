import React, { Component } from "react";
import "./App.css";
import CustomNavBar from "./Components/NavBar.js";
import LoginForm from "./Components/Accounts/LoginUser";
import RegisterForm from "./Components/Accounts/RegisterUser";
import Classroom from "./Components/Classroom"

import Home from "./Components/Home";
import SERVER_ADDRESS from "./config";

const base_url = SERVER_ADDRESS;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logged_in: localStorage.getItem("token") ? true : false,
      username: "",
      userId: "",
      isFaculty: "",
      classes: [],
      displayed_page: "",
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
            username: resp.username,
            userId: resp.id,
            isFaculty: resp.Role === "TR" ? true : false,
          });
          this.getClasses();
        })
        .catch((err) => console.log(err));
    }
  }

  display_page = (page) => {
    console.log(page);
    this.setState({
      displayed_page: page,
    });
  };

  handleLoginChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.setState({ logged_in: false, username: "" });
  };

  handleLogin = (e, data) => {
    e.preventDefault();
    console.log(data);
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
        console.log(json.user.Role === "TR");
        localStorage.setItem("token", json.token);
        this.setState({
          logged_in: true,
          username: json.user.username,
          userId: json.user.id,
          isFaculty: json.user.Role === "TR" ? true : false,
        });
        this.getClasses();
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({
      displayed_page: "home",
    });
  };

  getClasses = () => {
    console.log("This got in to the classs")
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

  renderSwitch(param , classId = 0) {
    switch (param) {
      case "login":
        return (
          <LoginForm
            handleLogin={this.handleLogin}
            handleLoginChange={this.handleLoginChange}
            handleLogout={this.handleLogout}
            username={this.state.username}
          />
        );
      case "register":
        return <RegisterForm />;
      case "home":
        return (
          <Home
            logged_in={this.state.logged_in}
            username={this.state.username}
            classes={this.state.classes}
          />
        );
      
      case "classroom":
        return <Classroom 
            classroomId = {classId}
            
        />
      default:
        return (
          <Home
            logged_in={this.state.logged_in}
            username={this.state.username}
            classes={this.state.classes}
            displayPage={this.display_page}

          />
        );
    }
  }

  render() {
    const { logged_in, username, userId, isFaculty } = this.state;
    return (
      <div>
        <CustomNavBar
          logged_in={logged_in}
          handleLogin={this.handleLogin}
          handleLoginChange={this.handleLoginChange}
          handleLogout={this.handleLogout}
          username={username}
          userId={userId}
          isFaculty={isFaculty}
          handleNewClass={() => this.display_page("home")}
          display_page={this.display_page}
          ClassRoomAdded={this.getClasses}
        />

        {this.renderSwitch(this.state.displayed_page)}
      </div>
    );
  }
}

export default App;
