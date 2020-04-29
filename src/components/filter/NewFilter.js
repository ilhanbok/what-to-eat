import React, { Component } from 'react';
import Checkbox from './Checkbox';

const items = [
    'Spicy',
    'Sweet',
    'Savory',
    'Healthy',
];
const items2 = [
    'American',
    'Chinese',
    'Mexican',
    'Indian',
    'Italian',
    'Korean',
    'Mediterranean',
];
const items3 = [
    'Birthday',
    'Business Meeting',
    'Friendly gathering',
    'Date',
    'Families with Children',
];

const items4 = [
    'Elegant',
    'Rustic',
    'Exotic',
    'Authentic',
    'Romantic',
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

    render() {
        return (

                <div className="col scroll">
                    <div className="row">
                    <div className="col">
                        <div className="filter-info">
                            <div className="filter-title">
                                <label>Taste</label>
                            </div>
                            <form onSubmit={this.handleFormSubmit}>
                                {this.createCheckboxes()}
                            </form>
                        </div>
                        <div className="filter-info">
                            <div className="filter-title">
                                <label>Cuisine</label>
                            </div>
                            <form onSubmit={this.handleFormSubmit}>
                                {this.createCheckboxes2()}
                            </form>
                        </div>
                        <div className="filter-info">
                            <div className="filter-title">
                                <label>Occassion</label>
                            </div>
                            <form onSubmit={this.handleFormSubmit}>
                                {this.createCheckboxes3()}
                            </form>
                        </div>
                        <div className="filter-info">
                            <div className="filter-title">
                                <label>Mood</label>
                            </div>
                            <form onSubmit={this.handleFormSubmit}>
                                {this.createCheckboxes4()}
                            </form>
                        </div>

                    </div>
                    </div>
                    <div className="row" style={{justifyContent: "center", marginBottom: '5%'}}>
                        <button className="btn btn-default" onClick={this.handleFormSubmit}>SEARCH</button>
                    </div>
                </div>

        );
    }
}

export default NewFilter;
