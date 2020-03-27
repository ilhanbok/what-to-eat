import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

// components
import Header from '../components/layout/Header';


// css
import '../css/style.css'


class Favorite extends Component {

    constructor(props) {
        super(props);

        this.state = {
            favorites: [
                {
                    name_: 'McDonalds',
                    key: 'aaa'
                },
                {
                    name_: 'Swagat',
                    key: 'bbb'
                },
                {
                    name_: 'Subway',
                    key: 'ccc'
                }
            ]
        }

        this.getFavoritesClient = this.getFavoritesClient.bind(this);
        this.renderFavorites = this.renderFavorites.bind(this);
    }

    getFavoritesClient() {
        // Query server and return favorites list
    }

    removeFavorite(key) {
        var arr = this.state.favorites;
        var index = arr.findIndex(x => x.key == key);
        if (index == -1) return;
        arr.splice(index, 1);
        this.setState({ favorites: arr });
    }

    renderFavorites() {
        return this.state.favorites.map(restaurant => (
                <tr><td className="fav-item"> {restaurant.name_} <i class="fa fa-star favorite" onClick={this.removeFavorite.bind(this, restaurant.key)}></i> </td></tr>
            )
        );
    }

    render() {
        return (
            <div className="box">
                <Header />
                <div className="fav-card card">
                    <div className="fav-title">
                        <div className="fav-title-box">
                            <div>Favorite</div>
                            <i class="fa fa-user-circle biguser"></i>
                        </div>
                    </div>
                    <div className="fav-update">
                        <table className="fav-table">
                            {this.renderFavorites()}
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Favorite;