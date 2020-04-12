import React, { Component } from "react";
import { SearchConsumer } from '../search/SearchContext'

class ListRestaurant extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.getInfo(),
        }
    }

    getInfo() {
        fetch('http://localhost:5000/rest_info', {
            method: 'POST',
            body: JSON.stringify({
                mode: 'lookup',
            }),
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json'
            }
        })
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

    render() {

        return (
            <div>
                {
                    name.map((info, i) => {
                        return (
                            <div key={i}>
                                <div>
                                    <div>
                                        <div>
                                            <p>{info.name}</p>
                                        </div>
                                        <p>{info.address}</p>
                                        <p>{info.stars}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default ListRestaurant;
