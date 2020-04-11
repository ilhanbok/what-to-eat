import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./login.css";
import Header from "../layout/Header";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        /*Login button*/
        try {
            await Auth.signIn(email, password);
            alert("Logged in");
        } catch (e) {
            alert(e.message);
        }
    }

    return (
        <div className="Container">
            <Header />
            <div className="Login">
            <div className="border">
            <h4 className = "h1text"> Log In</h4>
                <form onSubmit={handleSubmit}>
                    <FormGroup controlId="email" >
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            autoFocus
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />
                    </FormGroup>

                    <Button block disabled={!validateForm()} type="submit" bsSize = "small">
                        LOGIN
                    </Button>
                    <br/>
                    <center><h7>New to What to Eat?</h7></center>

                    <LinkContainer to="/signup" bsSize = 'large' id = 'login_button'>
                        <Button block bsSize="small" >
                            SIGN UP
                        </Button>
                    </LinkContainer>
                </form>
            </div>
            </div>
        </div>
    );
}