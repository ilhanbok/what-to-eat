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
