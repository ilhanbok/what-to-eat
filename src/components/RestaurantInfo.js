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
            //avgRating: 3,
            //comments: this.getComments(),
            rating: 0
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
                console.log(json.info.stars);
                this.setState({ name: json.info.name,
                    photo: json.info.photo_id,
                    address: json.info.address,
                    city: json.info.city,
                    state: json.info.state,
                    zipcode: json.info.postal_code,
                    category: json.info.categories,
                    delivery: json.info.attributes && (json.info.attributes.RestaurantsDelivery=='True'? 'Yes':'No'),
                    price: json.info.attributes && (json.info.attributes.RestaurantsPriceRange2=='2'? 'Cheap':
                            json.info.attributes.RestaurantsPriceRange2=='3'? 'Expensive':
                                json.info.attributes.RestaurantsPriceRange2=='4'? 'Very expensive':'Very cheap'),
                    avgRating: Math.round(json.info.stars / 2 + (json.average || json.info.stars) / 2)});
                
                if(json.info.hours){
                    this.setState({
                    Monday: json.info.hours.Monday || "N/A", 
                        Tuesday: json.info.hours.Tuesday || "N/A",
                        Wednesday: json.info.hours.Wednesday || "N/A",
                        Thursday: json.info.hours.Thursday || "N/A",
                        Friday: json.info.hours.Friday || "N/A",
                        Saturday: json.info.hours.Saturday || "N/A",
                        Sunday: json.info.hours.Sunday || "N/A",
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
        fetch('http://localhost:5000/make_comment', {
            method: 'POST',
            body : JSON.stringify({
            business_id : localStorage.getItem('currRest'),
            username : localStorage.getItem('userEmail') || "Anonymous",
            text : this.refs['comment_text'].value,
            rating : (this.state.rating==0? this.state.avgRating:this.state.rating)
        }),
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((json) => {
                window.location.reload();
            })
            .catch((error) => console.error(error));
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
        const {delivery} = this.state;
        const {category} = this.state;
        const {price} = this.state;
        const {photo} = this.state;
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
                    <img src = {"https://s3-media0.fl.yelpcdn.com/bphoto/" + photo + "/o.jpg"} style={{ 'border-radius' : 15, 'margin-bottom': 30, alignSelf: 'center', display: photo ? 'block' : 'none' }} width="400" height="300"></img>
                    <body>
                    <p>Category: {category}
                    <br/><br/>
                    Hours:<br/>
                    Monday: {Monday}<br/>
                    Tuesday: {Tuesday}<br/>
                    Wednesday: {Wednesday}<br/>
                    Thursday: {Thursday}<br/>
                    Friday: {Friday}<br/>
                    Saturday: {Saturday}<br/>
                    Sunday: {Sunday}
                    <br/><br/>
                    Address: {address}, {city}, {state}<br/>
                    Zipcode: {zipcode}<br/>
                    Delivery: {delivery}<br/>
                    Price: {price}
                    <br/><br/>
                    </p>
                    </body>
                    <div>
                        <body>Leave your rating:</body>
                        <body><StarRatingComponent
                            name="rate2"
                            starCount={5}
                            value={rating}
                            onStarClick={this.onStarClick.bind(this)}
                        /></body>
                        <body>Say something about this restaurant:</body>
                        <FormControl as="textarea" ref="comment_text" rows="6" cols="50" placeholder="Write comment here..."/>
                        {/*<body><textarea rows="10" cols="50" placeholder="Write comment here..."></textarea></body>*/}
                        <body><button className="button" onClick={this.onPostClick.bind(this)}>Post</button></body>
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

