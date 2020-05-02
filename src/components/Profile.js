import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, FormLabel} from "react-bootstrap";
import LoaderButton from "./signup/LoaderButton";
import Avatar from 'react-avatar';
//import { useFormFields } from "../libs/hooksLib";
//import "./ChangePassword.css";
import Header from '../components/layout/Header';

export default function ChangePassword() {
    const history = useHistory();
    const [fields, handleFieldChange] = useFormFields({
        password: "",
        oldPassword: "",
        confirmPassword: "",
    });
    const username = localStorage.getItem('userEmail');

    const [isChanging, setIsChanging] = useState(false);

    function useFormFields(initialState) {
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

    function validateForm() {
        return (
            fields.oldPassword.length > 0 &&
            fields.password.length > 0 &&
            fields.password === fields.confirmPassword
        );
    }

    async function handleChangeClick(event) {
        event.preventDefault();

        setIsChanging(true);

        try {
            const currentUser = await Auth.currentAuthenticatedUser();
            await Auth.changePassword(
                currentUser,
                fields.oldPassword,
                fields.password
            );

            history.push("/profile");
        } catch (e) {
            alert(e.message);
            setIsChanging(false);
        }
    }
    return (
        <div className="Container">
            <Header/>
            <div className="profile-card card" style = {{marginTop:100}}>
                <h2 style = {{marginBottom: '3%'}}>User Profile</h2>
                <Avatar name= {username} size="120" round={true} style = {{alignSelf:"center", marginBottom: '3%'}}/>
                <form onSubmit={handleChangeClick} style = {{alignSelf:"center", width: '40%', textAlign: 'left'}}>
                    <FormGroup controlId="userEmail">
                        <FormLabel>User Email</FormLabel>
                        <FormControl
                            type="email" value={username}
                        />
                    </FormGroup>
                    <FormGroup controlId="oldPassword">
                        <FormLabel>Old Password</FormLabel>
                        <FormControl
                            type="password"
                            onChange={handleFieldChange}
                            value={fields.oldPassword}
                        />
                    </FormGroup>
                    <hr />
                    <FormGroup className="form-group" bsSize="large" controlId="password">
                        <FormLabel>New Password</FormLabel>
                        <FormControl
                            type="password"
                            onChange={handleFieldChange}
                            value={fields.password}
                        />
                    </FormGroup>
                    <FormGroup bsSize="large" controlId="confirmPassword">
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
                        disabled={!validateForm()}
                        isLoading={isChanging}
                        style = {{marginBottom: '5%'}}
                    >
                        Change Password
                    </LoaderButton>
                </form>
            </div>
        </div>
    );
}
/*
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
// components
import Header from '../components/layout/Header';
// css
import '../css/style.css'


class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: localStorage.getItem('userEmail'),
            password: localStorage.getItem('userPassword'),
            confirm: localStorage.getItem('userPassword'),
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmChange = this.handleConfirmChange.bind(this);
    }

    handleUsernameChange(e) {
        this.setState({...this.state, username: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({...this.state, password: e.target.value});
    }

    handleConfirmChange(e) {
        this.setState({...this.state, confirm: e.target.value});
    }

    render() {
        return (
            <div class="Container">
                <Header />
                <div className="profile-card card" style = {{marginTop:100}}>
                    User Profile
                    <div className="update">
                        <i class="fa fa-user-circle biguser"></i>
                        <label className="stack">
                            <div className="wrapper">
                                Username:
                                <input type="text" className="hide-border" value={this.state.username} onChange={this.handleUsernameChange} />
                            </div>
                        </label>
                        <label className="stack">
                            <div className="wrapper">
                                Password:
                                <input type="password" className="hide-border" value={this.state.password} onChange={this.handlePasswordChange} />
                            </div>
                        </label>
                        <label className="stack">
                            <div className="wrapper">
                                Confirm Password:
                                <input type="password" className="hide-border" value={this.state.confirm} onChange={this.handleConfirmChange} />
                            </div>
                        </label>
                        <button className="button" OnClick={this.verifyCredentials}>Update</button>
                        <button className="button" OnClick={this.updateCredentials}>Save</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
*/
