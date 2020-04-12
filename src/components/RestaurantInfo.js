import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

// components

import Header from '../components/layout/Header';


// css
import '../css/style.css'

class RestaurantInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.getInfo(),
            avgRating: 3,
            comments: '',
            rating: 1
    }
    //this.addReview......
}

getInfo() {
    fetch('http://localhost:5000',{method: 'GET'},  { mode: 'no-cors'})
        .then((response) => response.json())
            .then((json) => {
                this.setState({ name: json.name,
                    address: json.address,
                    city: json.city,
                    state: json.state,
                    zipcode: json.postal_code,
                    Monday: json.hours.Monday,
                    Tuesday: json.hours.Tuesday,
                    Wednesday: json.hours.Wednesday,
                    Thursday: json.hours.Thursday,
                    Friday: json.hours.Friday,
                    Saturday: json.hours.Saturday,
                    Sunday: json.hours.Sunday,
                    avgRating: Math.round(json.stars)});
            })
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({ isLoading: false });
            });
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    render(){
        const { avgRating } = this.state;
        const { rating } = this.state;
        const { name } = this.state;
        const {Monday} = this.state;
        const {Tuesday} = this.state;
        const {Wednesday} = this.state;
        const {Thursday} = this.state;
        const {Friday} = this.state;
        const {Saturday} = this.state;
        const {Sunday} = this.state;
        const { address } = this.state;
        const { zipcode } = this.state;
        const {city} = this.state;
        const {state} = this.state;
        return(
            <div className="Container">
                <Header />
                <div className= "fav-card card" style = {{marginTop:100}}>
                    {name}
                    <h2>Avg. Rating: {avgRating}/5</h2>
                    <h2><StarRatingComponent
                        name="rate1"
                        starCount={5}
                        value={avgRating}
                    /></h2>
                    <body>Hours:</body>
                    <body>Monday: {Monday}</body>
                    <body>Tuesday: {Tuesday}</body>
                    <body>Wednesday: {Wednesday}</body>
                    <body>Thursday: {Thursday}</body>
                    <body>Friday: {Friday}</body>
                    <body>Saturday: {Saturday}</body>
                    <body>Sunday: {Sunday}</body>
                    <br/>
                    <body>Address: {address}, {city}, {state}</body>
                    <body>Zipcode: {zipcode}</body>
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
                        <FormControl as="textarea" rows="6" cols="50" placeholder="Write comment here..."/>
                        {/*<body><textarea rows="10" cols="50" placeholder="Write comment here..."></textarea></body>*/}
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
