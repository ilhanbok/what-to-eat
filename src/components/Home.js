import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Row'

// components
import Header from './layout/Header';
import FilterPanel from './filter/FilterPanel';
import ListPanel from './list/ListPanel';
import NewFilter from './filter/NewFilter';
import SearchBar from './search/SearchBar';
import ListRestaurant from './list/ListRestaurant';


// css
import '../css/style.css'

class Home extends React.Component {

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
            <div className="Container">
                <Header />
                <div className="Content-div">
                    <div className="content-div-search-bar">
                        <SearchBar
                            searchByValue={this.searchByValue}
                            searchTextChange={this.searchTextChange} />
                    </div>
                    <div className="restaurants-list">
                        <div className="filter-restaurants">
                            <NewFilter />
                        </div>
                        <div className="filter-restaurants">
                            <ListRestaurant/>
                        </div>
                    </div>
                </div>
            </div>
            /*<div className="container">
                { /!* including the Title and other components *!/}
                <Header />
                <SearchBar />
                <NewFilter />
            </div>*/
        );
    }
}
export default Home;
