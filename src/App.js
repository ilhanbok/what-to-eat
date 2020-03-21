import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { BrowserRouter as HashRouter, Route, Switch } from 'react-router-dom';



// components 
import Header from './components/layout/Header';
import Content from './components/Content';
import Hero from './components/layout/Hero';
import Home from './components/Home';


// css
import './css/style.css'


class App extends Component {
  // static propTypes = {
  //   className: PropTypes.string,
  // };

  constructor(props) {
    super(props);

    this.state = {
      showContent: false,
      searchText: ''
    }
    this.searchByValue = this.searchByValue.bind(this)
  }

  searchByValue(searchText) {
    console.log('Search text is now', searchText)
    this.setState({ showContent: true, searchText })
  }


  render() {
    let { showContent, userInfo, searchByValue, searchText } = this.state
    return (
      <BrowserRouter>
        <div className="container">
          { /* including the Title and other components */}
          <Switch>
            <Route exact path='/home' component={Home} />
            {/* <Route exact path='/login' component={Login}/> */}
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;