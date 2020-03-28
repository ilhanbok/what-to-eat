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
        <Navbar expand="lg" style={{backgroundColor: "darkorange"}}>
            <Navbar.Brand href="../home" style={{color: "white"}}>What to Eat</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Nav pullRight>
                    <Nav.Link href="../favorite" style={{color: "white"}}>Favorite</Nav.Link>
                    <Nav.Link href="../Profile" style={{color: "white"}}>Profile</Nav.Link>
                    <Nav.Link href="../signup" style={{color: "white"}}>Sign-Up
                    </Nav.Link>
                    <Nav.Link href="../login" style={{color: "white"}}>Login
                    </Nav.Link>
                    <Nav.Link href="../search" style={{color: "white"}}>Home
                    </Nav.Link>
                    <Nav.Link href="../restaurantinfo" style={{color: "white"}}>Restaurant Info
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};


export default Title;