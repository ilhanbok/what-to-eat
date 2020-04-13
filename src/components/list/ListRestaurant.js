import React, { Component } from "react";
import StarRatingComponent from 'react-star-rating-component';

import "./ListRestaurant.css";

class ListRestaurant extends Component {

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


    render() {
        const {name} = this.state;
        const getStatus = (res) => {
            if (!(res in this.state.starName)) this.state.starName[res] = "fa-star-o";
            return this.state.starName[res];
        }

        return (

            <div className="col scroll">
                <div>
                    {name && name.map((item) => {
                            return <div style = {{'marginTop':20, 'marginLeft':25, 'marginRight':25, }}>
                                <h5><a href="/restaurantinfo" onClick={this.setId.bind(this, item.business_id)}> {item.name}</a></h5>
                                <i className={"fa favorite " + getStatus((item.name))} id={"star"
                                + (item.name)} onClick={this.toggleStar.bind(this, (item.name))}></i>
                                <p>{item.address} </p>
                                <h6><StarRatingComponent
                                    name="rate1"
                                    starCount={5.0}
                                    value={item.stars}
                                /></h6>

                            </div>;

                        }
                    )
                    }

                </div>
            </div>

        )
    }
}

export default ListRestaurant;
