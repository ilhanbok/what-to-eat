import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
import StarsIcon from '@material-ui/icons/Stars';


const Title = () => {
  return (
      <Navbar bg="light" expand="lg">
          <Navbar.Brand href="../home">What to Eat</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">

                  <Nav.Link href="../favorite">Favorite</Nav.Link>
                  <Nav.Link href="../Profile">Profile</Nav.Link>
              </Nav>
          </Navbar.Collapse>
      </Navbar>
  );
};


export default Title;