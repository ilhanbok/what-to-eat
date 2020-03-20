import React, { Component } from 'react';

class Title extends Component {
  constructor() {
    super();
    
    this.goHome = this.goHome.bind(this);
    this.goFavorites = this.goFavorites.bind(this);
    this.goProfile = this.goProfile.bind(this);
  }
  
  goHome() {
    alert('Home button clicked!');
    // Add redirect code here
  }
  
  goFavorites() {
    alert('Star button clicked!');
    // Add redirect code here
  }
  
  goProfile() {
    alert('User button clicked!');
    // Add redirect code here
  }

  render() {
    return (
      <div className="title">
        <i class="fa fa-home home" onClick={this.goHome}></i>
        What <span className="bold-title">To Eat</span>
        <i class="fa fa-star favorite" onClick={this.goFavorites}></i>
        <i class="fa fa-user-circle profile" onClick={this.goProfile}></i>
      </div>
    );
  }
};


export default Title;
