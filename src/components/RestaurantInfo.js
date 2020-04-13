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
            //name: this.getInfo(),
            avgRating: 3,
            //comments: this.getComments(),
            rating: 1
        };
    }
    componentDidMount() {
        this.getInfo();
        this.getComments();
    }
    //this.addReview......

getInfo() {
    fetch('http://localhost:5000/rest_info', {
                                               method: 'POST', 
                                               body : JSON.stringify({
                                                 business_id : localStorage.getItem('currRest')
                                               }),
                                               headers: {
                                                 Accept: 'application/json', 'Content-Type': 'application/json'
                                               }
                                             })
        .then((response) => response.json())
            .then((json) => {
                this.setState({ name: json.info.name,
                    address: json.info.address,
                    city: json.info.city,
                    state: json.info.state,
                    zipcode: json.info.postal_code,
                    avgRating: Math.round(json.info.stars)});
                
                if(json.info.hours){
                    this.setState({
                    Monday: json.info.hours.Monday, 
                        Tuesday: json.info.hours.Tuesday,
                        Wednesday: json.info.hours.Wednesday,
                        Thursday: json.info.hours.Thursday,
                        Friday: json.info.hours.Friday,
                        Saturday: json.info.hours.Saturday,
                        Sunday: json.info.hours.Sunday,
                })} else {
                    this.setState({
                        Monday: "N/A",
                        Tuesday: "N/A",
                        Wednesday: "N/A",
                        Thursday: "N/A",
                        Friday: "N/A",
                        Saturday: "N/A",
                        Sunday: "N/A",
                    })
                }
            })
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({ isLoading: false });
            });
    }

    getComments() {
        var i;
        fetch('http://localhost:5000/rest_info', {
            method: 'POST',
            body : JSON.stringify({
                business_id : localStorage.getItem('currRest')
            }),
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((json) => {
                this.setState({ comments : json.comments });
            })
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({ isLoading: false });
            });
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    onPostClick(){
        //send rating and comment to server
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
        const {comments} = this.state;
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
                        <body><button className="button" onClick="onPostClick()">post</button></body>
                    </div>
                    <br/>
                    <body>
                    Reviews from other users:<br/>
                    {comments && comments.map((item) =>
                        {
                            return <div>{item.username}: {item.text}</div>;
                        }
                    )
                    }

                    </body>
                </div>
            </div>
        )
    }
}


export default RestaurantInfo;
