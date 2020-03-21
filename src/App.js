import React, { Component } from 'react';
import Profile from "./components/Profile";
import { BrowserRouter } from 'react-router-dom';

// components 
import Header from './components/layout/Header';
import Content from './components/Content';
import Hero from './components/layout/Hero'


// css
import './css/style.css'


class App extends Component {
  render() {
    return (
        <div class="container">
        <Profile/>
        </div>
    );
  }
}

export default App;
