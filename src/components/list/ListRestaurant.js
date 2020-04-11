import React, { Component } from "react";
import {
    ReactiveBase,
    DataSearch,
    ResultList,
    ReactiveList
} from "@appbaseio/reactivesearch";

import "./ListRestaurant.css";

// Importing Images
import americanFood from "../Images/americanFood.jpg";
import barFood from "../Images/barFood.jpeg";
import breakfast from "../Images/breakfast.jpeg";
import desserts from "../Images/desserts.jpeg";
import sandwich from "../Images/sandwich.jpeg";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            starName : {}
        }
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

    onData(resturant) {
        const image =
            resturant.cuisine === "Bar Food"
                ? barFood
                : resturant.cuisine === "Desserts"
                ? desserts
                : resturant.cuisine === "Breakfast"
                    ? breakfast
                    : resturant.cuisine === "American"
                        ? americanFood
                        : sandwich;

        const { rating, currency, address, cuisine } = resturant;
        
        
        const sanitize = (name) => {
            var res = name.match(/\w+/g).join("");
            return res;
        }
        
        const getStatus = (res) => {
          if (!(res in this.state.starName)) this.state.starName[res] = "fa-star-o";
          return this.state.starName[res];
        }

        return (
            <ReactiveList.ResultListWrapper>
                <ResultList key={resturant._id}>
                    <ResultList.Image src={image} />
                    <ResultList.Content>
                        <ResultList.Title>{resturant.name}</ResultList.Title>
                        <i className={"fa favorite " + getStatus(sanitize(resturant.name))} id={"star" + sanitize(resturant.name)} onClick={this.toggleStar.bind(this, sanitize(resturant.name))}></i>
                        <ResultList.Description>
                            <div>
                                <p>{address}</p>
                                <p>
                                    <span key="currency" className="tag">Currency : {currency}</span>
                                </p>
                                <p>
                                    <span className="tag">Favor : {cuisine}</span>
                                </p>
                                <div>Avg. Customer Reviews : {rating}</div>
                            </div>
                        </ResultList.Description>
                    </ResultList.Content>
                </ResultList>
            </ReactiveList.ResultListWrapper>
        );
    }

    render() {
        return (
            <div className="container-fluid">
                <ReactiveBase
                    app="yelp-app"
                    credentials="hkXdk3vcA:a32683f3-c8ad-45db-8c86-2ac2c0f45e0c"
                    type="yelp-app"
                >
                    <div className="row">
                        <div className="col-12 col-lg-12 col-md-12 col-sm-12 scroll">
                            <ReactiveList
                                componentId="queryResult"
                                dataField="name"
                                from={0}
                                size={15}
                                renderItem={this.onData.bind(this)}
                                pagination={true}
                                react={{
                                    and: [
                                        "currencyReactor",
                                        "ratingsReactor",
                                        "cuisineReactor",
                                        "deliveringNowReactor",
                                        "bookingReactor",
                                        "deliveryReactor",
                                        "tableBookinReactor",
                                        "nameReactor",
                                        "RangeSliderSensor"
                                    ]
                                }}
                                renderError={error => (
                                    <div>
                                        Something went wrong with ResultList!
                                        <br />
                                        Error details
                                        <br />
                                        {error}
                                    </div>
                                )}
                            />
                        </div>

                    </div>
                </ReactiveBase>
            </div>
        );
    }
}

export default App;
