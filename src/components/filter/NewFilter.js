import React, { Component } from 'react';
import Checkbox from './Checkbox';

const items = [
    'Credit Card',
    'Delivery',
    'Take Out',
    'Wheelchair Accessible',
];
const items2 = [
    'Alcohol',
    'Nightlife',
    'Good for Dancing'
];
const items3 = [
    'Afghan',
    'American (Traditional)',
    'American (New)',
    'Caribbean',
    'Chinese',
    'Indian',
    'Italian',
    'Korean',
    'Mexican',
    'Mediterranean',
    'Middle Eastern',
    'Peruvian',
    'Spanish',
    'Taiwanese',
    'Thai'
];
const items4 = [
    'Barbeque',
    'Bars',
    'Burgers',
    'Chicken Wings',
    'Cocktail Bars',
    'Food Trucks',
    'Hot Dogs',
    'Ramen',
    'Salad',
    'Sandwiches',
    'Sushi Bars',
    'Tacos',
    'Vegetarian',
];

const items5 = [
    'Quiet',
    'Average',
    'Loud',
    'Very Loud'
];
const items6 = [
    'Romantic',
    'Initmate',
    'Classy',
    'Hipster',
    'Divey',
    'Touristy',
    'Trendy',
    'Upscale',
    'Casual'
];

export class NewFilter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedCheckboxes : new Set()
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    toggleCheckbox = label => {
        console.log("toggled cb");
        var newSelectedCheckboxes = this.state.selectedCheckboxes;
        if (newSelectedCheckboxes.has(label)) {
            newSelectedCheckboxes.delete(label);
        } else {
            newSelectedCheckboxes.add(label);
        }
        this.setState({ selectedCheckboxes : newSelectedCheckboxes });
    }

    handleFormSubmit = () => {
        console.log("it is working");
        //formSubmitEvent.preventDefault();
        console.log(this.state.selectedCheckboxes);
        for (const checkbox of this.state.selectedCheckboxes) {
            console.log(checkbox, 'is selected.');
        }
    }

    createCheckbox = label => (
        <Checkbox
            label={label}
            onCheckboxChange={this.toggleCheckbox.bind(this, label)}
            key={label}
        />
    )

    createCheckboxes = () => (
        items.map(this.createCheckbox)
    )
    createCheckboxes2 = () => (
        items2.map(this.createCheckbox)
    )
    createCheckboxes3 = () => (
        items3.map(this.createCheckbox)
    )
    createCheckboxes4 = () => (
        items4.map(this.createCheckbox)
    )
    createCheckboxes5 = () => (
        items5.map(this.createCheckbox)
    )
    createCheckboxes6 = () => (
        items6.map(this.createCheckbox)
    )

    render() {
        return (

                <div className="col scroll">
                    <div className="row">
                    <div className="col">
                        <div className="filter-info">
                            <div className="filter-title">
                                <label>Accomodations</label>
                            </div>
                            <form onSubmit={this.handleFormSubmit}>
                                {this.createCheckboxes()}
                            </form>
                        </div>
                        <div className="filter-info">
                            <div className="filter-title">
                                <label>Nightlife</label>
                            </div>
                            <form onSubmit={this.handleFormSubmit}>
                                {this.createCheckboxes2()}
                            </form>
                        </div>
                        <div className="filter-info">
                            <div className="filter-title">
                                <label>Cuisine</label>
                            </div>
                            <form onSubmit={this.handleFormSubmit}>
                                {this.createCheckboxes3()}
                            </form>
                        </div>
                        <div className="filter-info">
                            <div className="filter-title">
                                <label>Food Item</label>
                            </div>
                            <form onSubmit={this.handleFormSubmit}>
                                {this.createCheckboxes4()}
                            </form>
                        </div>
                        <div className="filter-info">
                            <div className="filter-title">
                                <label>Noise Level</label>
                            </div>
                            <form onSubmit={this.handleFormSubmit}>
                                {this.createCheckboxes5()}
                            </form>
                        </div>
                        <div className="filter-info">
                            <div className="filter-title">
                                <label>Mood</label>
                            </div>
                            <form onSubmit={this.handleFormSubmit}>
                                {this.createCheckboxes6()}
                            </form>
                        </div>
                    </div>
                    </div>
                    <div className="row" style={{justifyContent: "center", marginBottom: '5%'}}>
                        <button className="btn btn-default" onClick={this.props.searchByValue}>SEARCH</button>
                    </div>
                </div>

        );
    }
}

export default NewFilter;
