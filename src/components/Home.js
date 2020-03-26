import React, { Component } from 'react';

// components
import Header from './layout/Header';
import Content from './Content';
import Hero from './layout/Hero';
import FilterPanel from './filter/FilterPanel';
import ListPanel from './list/ListPanel';


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
            <div className="box">
                { /* including the Title and other components */}
                <Header />
                <FilterPanel />
            </div>
        );
    }
}
export default Home;
