import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div className="container">
        <Form
          onSubmit={(event) =>
            this.props.handleLogin(event, {
              username: this.props.username,
              password: this.state.password,
            })
          }
          className="form-box"
        >
            <h1>Hello.! </h1>

          <Form.Group controlId="formPlaintextEmail" className="center">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" 
              onChange={this.props.handleLoginChange}
              value={this.props.username} name="username" />
          </Form.Group>

          <Form.Group controlId="formPlaintextPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              value={this.state.password}
              type="Password"
              name="password"
            />
          </Form.Group>

          <div className="submitButton">
          <Button type="submit" variant="primary" size="lg" block>
            Login
          </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default LoginForm;
