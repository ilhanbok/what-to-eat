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
        fetch('http://localhost:5000/getAll_info', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((json) => {
                this.setState({ name: json[0].name,
                    address: json[0].address,
                    star: json[0].stars
                    });
            })
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({ isLoading: false });
            });
    }

    render() {

        return (

                                <div>
                                    <div>
                                        <div>
                                            <p>{this.state.name}</p>
                                        </div>
                                        <p>{this.state.address}</p>
                                        <p>{this.state.stars}</p>
                                    </div>
                                </div>
                            /*</div>*/

                   /* })

            </div>*/
        )
    }
}

export default ListRestaurant;
