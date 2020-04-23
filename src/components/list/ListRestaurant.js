import React, { Component } from "react";
import StarRatingComponent from 'react-star-rating-component';

import "./ListRestaurant.css";
import SearchBar from '../search/SearchBar';

export class ListRestaurant extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.getInfo(),
            starName : {}
        }
    }

    getInfo() {
        fetch('http://localhost:5000/getAll_info', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    business_id:json,
                    name: json,
                    address: json,
                    stars: json
                });
            })
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({ isLoading: false });
            });
    }

    getSearchedInfo(){
        fetch('http://localhost:5000/getSearched_info', {
            method: 'POST',
            body : JSON.stringify({
                /*TODO name : need to get the search term here*/
            }),
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    business_id:json,
                    name: json,
                    address: json,
                    stars: json
                });
            })
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({ isLoading: false });
            });
    }

    toggleStar(res) {
        const toToggle = document.getElementById("star" + res);
        if (toToggle.classList.contains("fa-star-o")) {
            toToggle.classList.remove("fa-star-o");
            toToggle.classList.add("fa-star");
            this.state.starName[res] = "fa-star";
        } else {
            toToggle.classList.remove("fa-star");
            toToggle.classList.add("fa-star-o");
            this.state.starName[res] = "fa-star-o";
        }
    }

    setId(business_id) {
        localStorage.setItem('currRest', business_id);
    }

    loadRestaurant(name){
        //console.log('LR');
        this.setState({
            name: name
        });
    }

    setRestaurant(name){
        const getStatus = (res) => {
            if (!(res in this.state.starName)) this.state.starName[res] = "fa-star-o";
            return this.state.starName[res];
        }
        /*return name.map((item) => {*/
        console.log('check', name[1].name)
        return name.filter((restaurant) => {
            if (this.props.keyword == null)
                return restaurant
            else if (restaurant.name.toLowerCase().includes(this.props.keyword.trim().toLowerCase())) {
                return restaurant
            }
        }).map(item => {
            //console.log('check', name[1].name)
            return (
                <div style={{'marginTop': 20, 'marginLeft': 25, 'marginRight': 25,}}>
                    <h5><a href="/restaurantinfo" onClick={this.setId.bind(this, item.business_id)}> {item.name}</a>
                    </h5>
                    <i className={"fa favorite " + getStatus((item.name))} id={"star"
                    + (item.name)} onClick={this.toggleStar.bind(this, (item.name))}></i>
                    <p>{item.address} </p>
                    <h6><StarRatingComponent
                        name="rate1"
                        starCount={5.0}
                        value={item.stars}
                    /></h6>

                </div>
            )

        })
        /*return name.filter(restaurant => restaurant.name.includes(this.props.keyword)).map((item) => {

            //console.log('check', name[1].name)
            /!*{item.filter(restaurnat => restaurnat.name == 'cafe').map}*!/
            return (
                <div style={{'marginTop': 20, 'marginLeft': 25, 'marginRight': 25,}}>
                <h5><a href="/restaurantinfo" onClick={this.setId.bind(this, item.business_id)}> {item.name}</a>
                </h5>
                <i className={"fa favorite " + getStatus((item.name))} id={"star"
                + (item.name)} onClick={this.toggleStar.bind(this, (item.name))}></i>
                <p>{item.address} </p>
                <h6><StarRatingComponent
                    name="rate1"
                    starCount={5.0}
                    value={item.stars}
                /></h6>

            </div>
        )
        })*/
    }

     render() {
        const {name} = this.state;
         this.setRestaurant.bind(this, name)
            var restaurant = name && this.setRestaurant(name)
            console.log(restaurant)
            console.log('test', this.props.keyword)
            return (
                <div className="col scroll">
                    <div>
                        {restaurant}
                    </div>
                </div>
            )
    }
}

export default ListRestaurant;
