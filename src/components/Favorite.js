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
            favorites: this.getFavoritesClient()/*[
                {
                    name_: 'McDonalds',
                    key: '3a1w3Ufs9CCC3GJTAV8EpQ'
                },
                {
                    name_: 'Aldo\'s Cafe',
                    key: 'opdNlNy2oGE2mxuS0SXR1Q'
                },
                {
                    name_: 'Subway',
                    key: 'bqNV9FU60H9BVPJ4kWptOA'
                }
            ]*/
        }

        this.getFavoritesClient = this.getFavoritesClient.bind(this);
        this.renderFavorites = this.renderFavorites.bind(this);
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
                        this.setState({ favorites : json.favorites })
                })
        .catch((error) => console.error(error))
            .finally(() => {
                        this.setState({ isLoading: false });
                    });
    }

    removeFavorite(key, name) {
        var email = localStorage.getItem('userEmail');
        if (!email) return;
        if (window.confirm("Remove " + name + " from favorites?")) {
         fetch('http://localhost:5000/mod_favorites', {
                                                       method: 'POST', 
                                                       body : JSON.stringify({
                                                         email : email,
                                                         rest_id : key,
                                                         mode : 'remove'
                                                       }),
                                                       headers: {
                                                         Accept: 'application/json', 'Content-Type': 'application/json'
                                                       }
                                                     })
                .then((response) => response.json())
                    .then((json) => {
                        // Remove from favorites visually as well
                        var arr = this.state.favorites;
                        var index = arr.findIndex(x => x.rest_id == key);
                        if (index == -1) return;
                        arr.splice(index, 1);
                        this.setState({ favorites: arr });
                })
        .catch((error) => console.error(error))
            .finally(() => {
                        this.setState({ isLoading: false });
                    });
        }
    }
    
    setId(key) {
        localStorage.setItem('currRest', key);
    }

    renderFavorites() {
        return this.state.favorites && this.state.favorites.map(restaurant => (
                <tr><td className="fav-item">
                    <a href="/restaurantinfo" onClick={this.setId.bind(this, restaurant.rest_id)}> {restaurant.rest_name} </a><i class="fa fa-star favorite" onClick={this.removeFavorite.bind(this, restaurant.rest_id, restaurant.rest_name)}></i>
                </td></tr>
            )
        );
    }

    render() {
        return (
            <div className="Container" >
                <Header />
                <div className="fav-card card" style = {{'margin-top':100}}>
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
