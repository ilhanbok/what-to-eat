import React, { Component } from 'react';
import { Container } from 'bootstrap-4-react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Auth, Hub, Logger } from 'aws-amplify';

// components
import Initial from './components/Initial'
import Home from './components/Home';
import Profile from './components/Profile';
import Favorite from "./components/Favorite";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import RestaurantInfo from "./components/RestaurantInfo";

const logger = new Logger('Routes');

export default class Routes extends Component{
    constructor(props) {
        super(props);
        this.loadUser = this.loadUser.bind(this);
        Hub.listen('auth', this, 'main');
        this.state = { user: null }
    }
    componentDidMount() {
        this.loadUser();
    }
    onHubCapsule(capsule) {
        logger.info('on Auth event', capsule);
        this.loadUser();
    }
    loadUser() {
        Auth.currentAuthenticatedUser()
            .then(user => this.setState({ user: user }))
            .catch(err => this.setState({ user: null }));
    }
    render() {
        const { user } = this.state;
        return (
            <Switch>
                <Route exact path='/home' render={(props) => <Home user={user} />}/>
                <Route exact path='/' component={Initial}/>
                <Route exact path='/profile' component={Profile}/>
                <Route exact path='/favorite' component={Favorite}/>
                <Route exact path='/login'  render={(props) => <Login user={user} />}/>
                <Route exact path='/signup' component={Signup}/>
                <Route exact path='/restaurantinfo' component={RestaurantInfo}/>
                {/* <Route exact path='/login' component={Login}/> */}
            </Switch>
        );
    }
}