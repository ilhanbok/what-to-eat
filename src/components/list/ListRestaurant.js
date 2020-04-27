import React, { Component } from "react";
import StarRatingComponent from 'react-star-rating-component';

import "./ListRestaurant.css";
import SearchBar from '../search/SearchBar';

export class ListRestaurant extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.getInfo(),
            starName : {},
            favorites : []
        }
        this.getFavoritesClient = this.getFavoritesClient.bind(this);
    }
    
    getFavoritesClient() {
         var email = localStorage.getItem('userEmail');
         if (!email) return;
         fetch('http://localhost:5000/mod_favorites', {
                                                       method: 'POST', 
                                                       body : JSON.stringify({
                                                         email : email,
                                                         mode : 'getall'
                                                       }),
                                                       headers: {
                                                         Accept: 'application/json', 'Content-Type': 'application/json'
                                                       }
                                                     })
                .then((response) => response.json())
                    .then((json) => {
                        this.setState({ favorites : json.favorites.map((item) => {
                                return item.rest_id;
                            })
                        })
                        console.log(this.state.favorites);
                })
        .catch((error) => console.error(error))
            .finally(() => {
                        this.setState({ isLoading: false });
                    });
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
    
    componentDidMount() {
        this.getFavoritesClient();
    }
    
    toggleFavorite(isAdding, name, id) {
        var email = localStorage.getItem('userEmail');
        if (!email) return;
         fetch('http://localhost:5000/mod_favorites', {
                                                       method: 'POST', 
                                                       body : JSON.stringify({
                                                         email : email,
                                                         rest_id : id,
                                                         rest_name : name,
                                                         mode : isAdding ? 'add' : 'remove'
                                                       }),
                                                       headers: {
                                                         Accept: 'application/json', 'Content-Type': 'application/json'
                                                       }
                                                     })
                .then((response) => response.json())
                    .then((json) => {
                        // do nothing
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
        if (localStorage.getItem('userEmail')==''){
            if (window.confirm("Please Login first. Click Ok to direct to Login page!")) {
                window.location.href = "http://localhost:3000/login"
            }
            /*alert('Please log in first');*/
        }
        else {
            const toToggle = document.getElementById("star" + id);
            // Add to favorites
            if (toToggle.classList.contains("fa-star-o")) {
                toToggle.classList.remove("fa-star-o");
                toToggle.classList.add("fa-star");
                this.state.starName[id] = "fa-star";
                this.toggleFavorite.bind(this, true, name, id);
                this.toggleFavorite(true, name, id);
            // Remove from favorites
            } else if (window.confirm("Remove " + name + " from favorites?")) {
                toToggle.classList.remove("fa-star");
                toToggle.classList.add("fa-star-o");
                this.state.starName[id] = "fa-star-o";
                this.toggleFavorite.bind(this, false, name, id);
                this.toggleFavorite(false, name, id);
            }
        }
    }

    /*setId(business_id, e) {
        localStorage.setItem('currRest', business_id);
        console.log('onclick');
    }*/

    loadRestaurant(name){
        //console.log('LR');
        this.setState({
            name: name
        });
    }

    setRestaurant(name){
        const getStatus = (res) => {
            if (this.state.favorites.includes(res)) this.state.starName[res] = "fa-star";
            else if (!(res in this.state.starName)) this.state.starName[res] = "fa-star-o";
            return this.state.starName[res];
        }
        const setId = (business_id, e) => {
            localStorage.setItem('currRest', business_id);
        }
        /*return name.map((item) => {*/
        console.log('check', name[1].name)
        var matches = name.filter((restaurant) => {
            if (this.props.keyword == null)
                return restaurant
            else if (restaurant.name.toLowerCase().includes(this.props.keyword.trim().toLowerCase()) ||
                restaurant.categories.toLowerCase().includes(this.props.keyword.trim().toLowerCase())) {
                return restaurant
            }
        })
        console.log('matches: ' + matches);
        if (matches.length == 0) {
            return (
                <div style={{'text-align':'center', 'margin-top':'20%'}}>
                <div style={{'font-size': 100}}>🥘 No results :( 🍔</div>
                <div style={{'font-size': 40}}>Try searching with fewer criteria or different keywords</div>
                </div>
            );
        } else {
            return matches.map(item => {
                //console.log('check', name[1].name) categories
                return (
                    <div style={{'marginTop': 20, 'marginLeft': 25, 'marginRight': 25,}}>
                        <h5><a href="/restaurantinfo" onMouseDown={(e) => setId(item.business_id, e)}> {item.name}</a>
                        </h5>
                        <i className={"fa favorite " + getStatus((item.business_id))} id={"star"
                        + (item.business_id)} onClick={this.toggleStar.bind(this, item.name, item.business_id)}></i>
                        <p>{item.address} </p>
                        <h6><StarRatingComponent
                            name="rate1"
                            starCount={5.0}
                            value={Math.round(item.stars)}
                        /></h6>

                    </div>
                )

            })
        }
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
