import React from "react";
import { Route, Switch } from "react-router-dom";

// components
import Initial from './components/Initial'
import Home from './components/Home';
import Profile from './components/Profile';
import Favorite from "./components/Favorite";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import RestaurantInfo from "./components/RestaurantInfo";
import Test from "./components/test";

export default function Routes() {
  return (
    <Switch>
        <Route exact path='/home' component={Home} />
        <Route exact path='/' component={Initial} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/favorite' component={Favorite} />
        <Route exact path='/login' component ={Login}/>
        <Route exact path='/signup' component ={Signup}/>
        <Route exact path='/restaurantinfo' component={RestaurantInfo} />
        <Route exact path='/test' component={Test} />
        {/* <Route exact path='/login' component={Login}/> */}
    </Switch>
  );
}