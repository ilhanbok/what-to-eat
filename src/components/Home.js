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
    //const searchTerm = React.useRef(null);

    constructor(props) {
        super(props);

        this.state = {
            searchText: 'test'
            //searchTerm: React.useRef(null)
        }
        //this.searchTerm = React.useRef(null);
        //this.searchByValue = this.searchByValue.bind(this)
    }


    /*searchByValue = e => {
        const keyword = this.searchTerm.current.value;
        this.setState({
            value: keyword
        })
        console.log('Search text is now', keyword);
    }*/



    render() {
        //const searchTerm = React.useRef(null);
        const searchByValue = e => {
            const keyword = document.getElementById('textTerm').value;
            this.setState({
                value: keyword

            })
            //ListRestaurant.loadRestaurant(keyword);
            console.log('Search text is now', keyword);
        }

        let { showContent, userInfo, searchText } = this.state
        return (
            <div className="Container">
                <Header />
                <div className="Content-div">
                    <div className="content-div-search-bar">
                        <SearchBar
                            searchByValue={searchByValue}
                            //searchTerm={searchTerm}
                            />
                    </div>
                    <div className="restaurants-list">
                        <div className="filter-restaurants">
                            <NewFilter />
                        </div>
                        <div className="filter-restaurants">
                            <ListRestaurant keyword = {this.state.value}/>
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
