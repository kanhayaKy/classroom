import React from "react";
import Axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SERVER_ADDRESS from "./../../config";
import { Redirect } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";

const base_url = SERVER_ADDRESS;
class RegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      uid: "",
      password: "",
      checked: false,
      submitted: false,
    };
  }

  sendRegistration = (event) => {
    event.preventDefault();
    const { first_name, last_name, username, uid, password, checked } =
      this.state;
    Axios.post(base_url + "users/create", {
      user: {
        UID: uid,
        first_name: first_name,
        last_name: last_name,
        username: username,
        password: password,
        Role: checked ? "TR" : "ST",
      },
    })
      .then((response) => {
        console.log(response);
        console.log(response.status + " " + response.statusText);
      })
      .catch((error) => {
        console.log(error);
      });
    this.clearForm();
    this.setState({
      submitted: true,
    });
  };

  changeHandler = (event) => {
    event.preventDefault();
    console.log(event);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  checkHandler = (event) => {
    this.setState({
      checked: event.target.checked,
    });
  };

  clearForm = () => {
    this.setState({
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      uid: "",
      checked: "",
    });
  };

  render() {
    return (
      <div className="container">
        <Form onSubmit={this.sendRegistration} noValidate className="form-box">
          <h1>Register </h1>

          <Form.Group controlId="formPlaintextEmail" className="center">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              placeholder="First name"
              onChange={this.changeHandler}
              value={this.state.first_name}
            />
          </Form.Group>

          <Form.Group controlId="formPlaintextEmail" className="center">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              placeholder="Last name"
              onChange={this.changeHandler}
              value={this.state.last_name}
            />
          </Form.Group>

          <Form.Group controlId="formPlaintextEmail" className="center">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              onChange={this.changeHandler}
              value={this.state.username}
            />
          </Form.Group>

          <Form.Group controlId="formPlaintextEmail" className="center">
            <Form.Label>User Id</Form.Label>
            <Form.Control
              type="text"
              name="uid"
              placeholder="User Id"
              onChange={this.changeHandler}
              value={this.state.uid}
            />
          </Form.Group>

          <Form.Group controlId="formPlaintextPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={this.changeHandler}
              value={this.state.password}
              type="Password"
              name="password"
            />
          </Form.Group>
          <Form.Group controlId="formPlaintextEmail" className="center">
            <Form.Label>Faculty</Form.Label>
            <Checkbox
              name="checked"
              color="default"
              checked={this.state.checked}
              onChange={this.checkHandler}
              inputProps={{ "aria-label": "checkbox with default color" }}
            />
          </Form.Group>
          {this.state.submitted ? <Redirect to="/login" /> : <React.Fragment />}
          <div className="submitButton">
            <Button type="submit" variant="primary" size="lg" block>
              Register
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default RegisterForm;
