import React, { Component } from 'react';
import './App.css';
const base_url = "localhost:8000";

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            loggedIn : localStorage.getItem('token') ? true : false,
            username : '',
            page : ''
        }
    }

    componentDidMount(){
		if(this.props.logged_in){
			fetch(base_url + 'classroom/current_user/', {
				method : 'GET',
				headers : {
					Authorization : `JWT ${localStorage.getItem('token')}`
				}
			})
			.then(res => res.json())
			.then(response => {
				this.setState({ username : response.username })
			})
			.catch(err => {
        console.log(err)});
		}
    }
    

    

}


export default App;


// 
// 
// 

import React from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

class CustomNavBar extends React.Component {
  clickHandler(event){
    console.log(event.target.name);
  }

  navContent() {
    if (this.props.logged_in) {
      return (
        <>
          <Nav.Link href="#features">+</Nav.Link>
          <Nav.Link href="#pricing">About</Nav.Link>
          <NavDropdown title={this.props.username} id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onSelect={() =>this.props.handleLogout}> Logout </NavDropdown.Item>
          </NavDropdown>
        </>
      );
    } else {
      return (
        <>
          <Nav.Link onSelect = {this.clickHandler} name="login">Login</Nav.Link>
          <Nav.Link onSelect = {() => this.props.display_page('signup')}>Register</Nav.Link>
        </>
      );
    }
  }

  render() {
    return (
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Navbar.Brand href="#home">ClassRoom</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">{this.navContent()}</Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default CustomNavBar;
