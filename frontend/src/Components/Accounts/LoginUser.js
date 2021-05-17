import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:"",
      password: "",
      error:false,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleError = () => {
    console.log("Handling");
    this.setState({
      username:"",
      password:"",
      error: true,
    })
  }

  handleLogin = (event) => {

    const err = this.props.handleLogin(event, {
      username: this.state.username,
      password: this.state.password,
    });
    if(err){
      this.handleError();
    }
  }

  render() {
    return (
      <div className="container">
        <Form
          onSubmit={(event) =>
             this.handleLogin(event)
          }
          className="form-box"
        >
            <h1>Login </h1>
            {this.state.error && <p className="err">UserName or password invalid</p>}

          <Form.Group controlId="formPlaintextEmail" className="center">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" 
              onChange={this.handleChange}
              value={this.state.username} name="username" />
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
