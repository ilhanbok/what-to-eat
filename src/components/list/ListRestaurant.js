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

        return (
            <ReactiveList.ResultListWrapper>
                <ResultList key={resturant._id}>
                    <ResultList.Image src={image} />
                    <ResultList.Content>
                        <ResultList.Title>{resturant.name}</ResultList.Title>
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
                                renderItem={this.onData}
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
