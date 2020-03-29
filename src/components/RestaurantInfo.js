import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';

// components

import Header from '../components/layout/Header';


// css
import '../css/style.css'

class RestaurantInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: 'McDonalds',
            hour: '7:00-23:00, 7 days a week',
            address: '2333 Dankswag Rd, Madison, WI',
            zipcode: '53715',
            avgRating: 3,
            rating: 1
        }
        //this.addReview......
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    render(){
        const { avgRating } = this.state;
        const { rating } = this.state;
        const { name } = this.state;
        const { hour } = this.state;
        const { address } = this.state;
        const { zipcode } = this.state;
        return(
            <div className="Container">
                <Header />
                <div className="fav-card card" style = {{marginTop:100}}>
                    {name}
                    <h2>Avg. Rating: {avgRating}/5</h2>
                    <h2><StarRatingComponent
                        name="rate1"
                        starCount={5}
                        value={avgRating}
                    /></h2>
                    <body>hour: {hour}</body>
                    <body>address: {address}</body>
                    <body>zipcode: {zipcode}</body>
                    <br/>
                    <div>
                        <body>Leave your rating:</body>
                        <body><StarRatingComponent
                            name="rate2"
                            starCount={5}
                            value={rating}
                            onStarClick={this.onStarClick.bind(this)}
                        /></body>
                        <body>Say something about this restaurant:</body>
                        <body><input/></body>
                        <body><button className="button" onClick={this.addReview}>post</button></body>
                    </div>
                    <br/>
                    <body>
                    Reviews from other users:<br/>
                    Colonel Sanders: I love Big Mac
                    </body>
                </div>
            </div>
        )
    }
}


export default RestaurantInfo;
