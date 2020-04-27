import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";
// components


// css
import '../../css/style.css';

function onFavClick(){
    if (localStorage.getItem('userEmail')==''){
        if (window.confirm("Please Login first. Click Ok to direct to Login page!")) {
            window.location.href = "http://localhost:3000/login"
        }
        /*alert('Please log in first');*/
    }
    else{
        window.location.href = "http://localhost:3000/favorite";
    }
}

function onProfileClick(){
    if (localStorage.getItem('userEmail')==''){
        if (window.confirm("Please Login first. Click Ok to direct to Login page!")) {
            window.location.href = "http://localhost:3000/login"
        }
        /*alert('Please log in first');*/
    }
    else{
        window.location.href = "http://localhost:3000/Profile";
    }
}

const Title = () => {
    return (
        <Navbar expand="lg" style={{backgroundColor: "darkorange"}}>
            <Navbar.Brand href="../home" style={{color: "white"}}><i class="fa fa-fw fa-home"></i> What to Eat</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Nav pullRight>
                    <Nav.Link onClick = {onFavClick}><i class="fa fa-star"></i></Nav.Link>
                    <Nav.Link onClick = {onProfileClick} style={{color: "white"}}><i class="fa fa-user-circle"></i></Nav.Link>
                    {/* <Nav.Link href="../search" style={{color: "white"}}>Home
                    </Nav.Link>*/}

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};


export default Title;
