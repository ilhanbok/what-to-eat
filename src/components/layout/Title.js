import React, { Component } from 'react';
import { Navbar, Nav, BSpan } from 'bootstrap-4-react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Auth, Hub, Logger } from 'aws-amplify';
import { SignOut } from 'aws-amplify-react';

function onFavClick(){
    if (localStorage.getItem('userEmail')==''){
        if (window.confirm("Please Login first. Click Ok to direct to Login page!")) {
            window.location.href = "http://localhost:3000/login"
        }

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

    }
    else{
        window.location.href = "http://localhost:3000/Profile";
    }
}

function signOut(){
    if(localStorage.getItem('userEmail')!=''){
        console.log("signout")
        localStorage.setItem('userEmail','')
        localStorage.setItem('userpassword', '')
        window.location.reload()
    }
}
const HomeItems = props => (
    <React.Fragment>
        <Nav.ItemLink href="../login" style={{color:'white'}}>
            Login
        </Nav.ItemLink>
    </React.Fragment>
)
const LoginItems = props => (
    <React.Fragment>
        <Nav.ItemLink href="../login" style={{color:'white'}} active>
            Login
            <BSpan srOnly>(current}</BSpan>
        </Nav.ItemLink>
    </React.Fragment>
)

const logger = new Logger('Navigator');
export default class Title extends Component {
    constructor(props) {
        super(props);
        this.loadUser = this.loadUser.bind(this);
        Hub.listen('auth', this, 'navigator'); // Add this component as a listener of auth events.
        this.state = { user: null }
    }
    componentDidMount() {
        this.loadUser(); // The first check
    }
    onHubCapsule(capsule) {
        logger.info('on Auth event', capsule);
        this.loadUser(); // Triggered every time user sign in / out.
    }
    loadUser() {
        Auth.currentAuthenticatedUser()
            .then(user => {this.setState({ user: user });

            })
            .catch(err => {this.setState({ user: null });
                console.log('Signed out');
                signOut();
            });
    }
    render() {
        const { user } = this.state;
        return (
            <Navbar expand="lg" style={{backgroundColor: "darkorange"}}>
                <Navbar.Brand href="../home" style={{color: "white"}}> 🍽 What to Eat</Navbar.Brand>
                <Navbar.Toggler target="#navbarsExampleDefault" aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Navbar.Nav mr="auto">
                        <HashRouter>
                            <Switch>
                                <Route exact path="/" component={HomeItems} />
                                <Route exact path="/login" component={LoginItems} />
                            </Switch>
                        </HashRouter>
                    </Navbar.Nav>
                    <Navbar.Nav pullRight>
                        <Nav.Link onClick = {onFavClick}><i class="fa fa-star"></i></Nav.Link>
                        <Nav.Link onClick = {onProfileClick} style={{color: "white"}}><i class="fa fa-user-circle"></i></Nav.Link>
                    </Navbar.Nav>
                    <Navbar.Text mr="2" style={{color:'white'}}>
                        { user? 'Hi ' + localStorage.getItem('userEmail') : 'Please sign in' }
                    </Navbar.Text>
                    { user && <SignOut onClick = {signOut}/>}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
/*
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
        /!*alert('Please log in first');*!/
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
        /!*alert('Please log in first');*!/
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
                    {/!* <Nav.Link href="../search" style={{color: "white"}}>Home
                    </Nav.Link>*!/}

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};


export default Title;
*/
