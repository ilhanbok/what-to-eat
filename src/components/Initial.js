import React from "react";
import "../css/Initial.css"
import { LinkContainer } from "react-router-bootstrap";
import { Navbar,Nav,NavItem } from "react-bootstrap";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

export default function Initial() {
    return (
        <div className="Initial">
            <div className="lander">
                <h1>What to Eat</h1>
                <p>Yo</p>

                <LinkContainer to="/search" className = 'discover_button'>
                    <Button block bsSize="large">
                        Discover Food
                    </Button>
                </LinkContainer>

                <LinkContainer to="/signup" className = 'signup_button'>
                    <Button block bsSize="large">
                        Sign Up
                    </Button>
                </LinkContainer>

                <LinkContainer to="/login" className = 'login_button'>
                    <Button block bsSize="large">
                        Login
                    </Button>
                </LinkContainer>

            </div>
        </div>
    );
}