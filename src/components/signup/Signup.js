import React, { useState } from "react";
import {
    FormGroup,FormControl,FormLabel,Button
} from "react-bootstrap";
import "./Signup.css";
import LoaderButton from "./LoaderButton";
import Header from "../layout/Header";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
//import { useAppContext } from "../../libs/contextLib";




export function useFormFields(initialState) {
    const [fields, setValues] = useState(initialState);

    return [
        fields,
        function(event) {
            setValues({
                ...fields,
                [event.target.id]: event.target.value
            });
        }
    ];
}

export default function Signup(props) {
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
        confirmPassword: "",
        confirmationCode: ""
    });
    const [newUser, setNewUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    //const { userHasAuthenticated } = useAppContext();


    function validateForm() {

            return (
                fields.email.length > 0 &&
                fields.password.length > 0 &&
                fields.password === fields.confirmPassword
            );
        
    }

    function validateConfirmationForm() {
        return fields.confirmationCode.length > 0;
    }

    async function handleSubmit(event) {
                event.preventDefault();

                setIsLoading(true);

                try {
                    const newUser = await Auth.signUp({
                    username: fields.email,
                    password: fields.password,
                    });
                    setIsLoading(false);
                    setNewUser(newUser);
                } catch (e) {
                    setIsLoading(false);
                    alert(e.message);
                }
    }

    async function handleConfirmationSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        try {
            await Auth.confirmSignUp(fields.email, fields.confirmationCode);
            await Auth.signIn(fields.email, fields.password);

            //userHasAuthenticated(true);
            history.push("/");
        } catch (e) {
            setIsLoading(false);
            alert(e.message);
        }
    }

    function renderConfirmationForm() {
        return (
            <form onSubmit={handleConfirmationSubmit}>
                <FormGroup controlId="confirmationCode" bsSize="large">
                    <FormLabel>Confirmation Code</FormLabel>
                    <FormControl
                        autoFocus
                        type="tel"
                        onChange={handleFieldChange}
                        value={fields.confirmationCode}
                    />
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    isLoading={isLoading}
                    disabled={!validateConfirmationForm()}
                >
                    Verify
                </LoaderButton>
            </form>
        );
    }

    function renderForm() {
        return (
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={fields.email}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        type="password"
                        value={fields.password}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="confirmPassword" bsSize="large">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl
                        type="password"
                        onChange={handleFieldChange}
                        value={fields.confirmPassword}
                    />
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    id="signup"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    SIGN UP
                </LoaderButton>
                <center><p className="inline">Already a member? </p><a className="inline" href="/login"><h7 ><u>Log in</u></h7></a></center>


            </form>
        );
    }

    return (
        <div className="Signup">
            <Header />
            <div className = "border">
            <h4 className = "h1text"> Sign Up</h4>
            {newUser === null ? renderForm() : renderConfirmationForm()}
            </div>
        </div>
    );
}
