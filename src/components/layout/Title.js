import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";
// components


// css
import '../../css/style.css'


const Title = () => {
    return (
        <Navbar expand="lg" style={{backgroundColor: "darkorange"}}>
            <Navbar.Brand href="../home" style={{color: "white"}}><i class="fa fa-fw fa-home"></i> What to Eat</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Nav pullRight>
                    <Nav.Link href="../restaurantinfo" style={{color: "white"}}>Restaurant Info
                    </Nav.Link>
                    <Nav.Link href="../favorite"><i class="fa fa-star"></i></Nav.Link>
                    <Nav.Link href="../Profile" style={{color: "white"}}><i class="fa fa-user-circle"></i></Nav.Link>
                    {/* <Nav.Link href="../search" style={{color: "white"}}>Home
                    </Nav.Link>*/}

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};


export default Title;
