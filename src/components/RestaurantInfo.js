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
    const convertToNormalTime = function(range) {
        if (range) {
            var times = range.split('-');
            var start_hour = Number(times[0].split(':')[0]);
            var start_minute = times[0].split(':')[1];
            if (start_minute == '0') start_minute = '00';
            var end_minute = times[1].split(':')[1];
            if (end_minute == '0') end_minute = '00';
            var end_hour = Number(times[1].split(':')[0]);
            var start_suffix = ' AM';
            var end_suffix = ' AM'
            if (start_hour >= 12) start_suffix = ' PM';
            if (start_hour > 12) start_hour -= 12;
            
            if (end_hour >= 12) end_suffix = ' PM';
            if (end_hour > 12) end_hour -= 12;
            if (start_hour == 0) {
              start_hour = 12;
            }
            if (end_hour == 0) {
              end_hour = 12;
            }
            return [start_hour + ':' + start_minute + start_suffix,
                    end_hour + ':' + end_minute + end_suffix].join('-');
        }
    }


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
                                json.info.attributes.RestaurantsPriceRange2=='4'? 'Very Expensive':'Very Cheap'),
                    avgRating: Math.round(json.info.stars / 2 + (json.average || json.info.stars) / 2)});
                
                if(json.info.hours){
                    console.log(json.info.hours);
                    this.setState({
                    Monday: convertToNormalTime(json.info.hours.Monday) || "N/A", 
                        Tuesday: convertToNormalTime(json.info.hours.Tuesday) || "N/A",
                        Wednesday: convertToNormalTime(json.info.hours.Wednesday) || "N/A",
                        Thursday: convertToNormalTime(json.info.hours.Thursday) || "N/A",
                        Friday: convertToNormalTime(json.info.hours.Friday) || "N/A",
                        Saturday: convertToNormalTime(json.info.hours.Saturday) || "N/A",
                        Sunday: convertToNormalTime(json.info.hours.Sunday) || "N/A",
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
        if (this.refs['comment_text'].value==''){
            alert('Please input comments');
        }
        else if (this.state.rating==0){
            alert('Please input rating');
        }
        else{
            //send rating and comment to server
            fetch('http://localhost:5000/make_comment', {
                method: 'POST',
                body : JSON.stringify({
                    business_id : localStorage.getItem('currRest'),
                    username : localStorage.getItem('userEmail') || "Anonymous",
                    text : this.refs['comment_text'].value,
                    rating : this.state.rating
                }),
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then((json) => {
                    window.location.reload();
                })
                .catch((error) => console.error(error));}
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
                    <div style={{ padding: 15, 'font-size': 20 }}>
                    <p>Category: {category}
                    <br/>
                    <hr/>
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
                    <br/>
                    <hr/>
                    </p>
                    <div>
                        Leave your rating:<br/>
                        <StarRatingComponent
                            name="rate2"
                            starCount={5}
                            value={rating}
                            onStarClick={this.onStarClick.bind(this)}
                        />
                        <br/>
                        Say something about this restaurant:
                        <br/>
                        <br/>
                        <FormControl as="textarea" ref="comment_text" rows="6" cols="50" placeholder="Write comment here..."/>
                        {/*<body><textarea rows="10" cols="50" placeholder="Write comment here..."></textarea></body>*/}
                        <button className="btn search-btn" onClick={this.onPostClick.bind(this)} style={{marginTop:'1%'}}>Post</button>
                    </div>
                    Reviews<br/>
                    <div className="border infoBorder">
                    {comments && comments.map((item) =>
                        {
                            return <div>{item.username}: {item.text}</div>;
                        }
                    )
                    }
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default RestaurantInfo;

