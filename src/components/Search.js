import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

// components 
import Header from './layout/Header';
import Content from './Content';
import Hero from './layout/Hero'


// css
import '../css/style.css'


class Search extends Component {
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
          <Header />
          {(showContent == false)
            ? <Hero searchByValue={this.searchByValue} />
            : <Content searchText={searchText} userInfo={userInfo} />}

        </div>
      </BrowserRouter>
    );
  }
}

export default Search;
