import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";
//import { LinkContainer } from "react-router-bootstrap";
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
                </Nav>
                <Nav pullRight>
                    <Nav.Link href="../favorite">Favorite</Nav.Link>
                    <Nav.Link href="../Profile">Profile</Nav.Link>
                    <Nav.Link href="../signup">Sign-Up
                    </Nav.Link>
                    <Nav.Link href="../login">Login
                    </Nav.Link>
                    <Nav.Link href="../search">Home
                    </Nav.Link>
                    <Nav.Link href="../restaurantinfo">Restaurant Info
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};


export default Title;