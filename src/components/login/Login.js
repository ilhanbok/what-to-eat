import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./login.css";
import Header from "../layout/Header";

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        /*Login button*/
    }

    return (
        <div className="Container">
            <Header />
            <div className="Login">
            {/* <div className="card"> */}
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

                    <Button disabled={!validateForm()} type="submit" bsSize = "small">
                        Login
                    </Button>
                </form>
            </div>
            {/* </div> */}
        </div>
    );
}