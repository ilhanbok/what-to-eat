import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

// components
import Header from '../components/layout/Header';


// css
import '../css/style.css'

class RestaurantInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: 'McDonalds',
            hour: '7:00-23:00, 7 days a week',
            address: '2333 Dankswag Rd, Madison, WI',
            zipcode: '53715'

        }
    }
}


export default RestaurantInfo;