import React, { Component } from 'react';
import './App.css';
import { GoogleApiWrapper } from 'google-maps-react'
import Map from './components/map'
import * as PlacesAPI from './data/placesAPI'

class App extends Component {

  state = {
    sidebarClass: 'open-side',
    bodySideClass: 'App body-slide',
    locations: []
  }

  componentDidMount() {
    this.getAllLocations();
  }

  componentDidUpdate() {
    this.removeTabIndex();
  }

  getAllLocations() {
    PlacesAPI.getAllLocations()
      .then(data => {
        this.setState({ locations: data.response.groups[0].items });
      })
      .catch(err => {
        alert(err);
      });
  }

  // Use this function to toggle classes for opening and closing the attraction items by the hamburger menu item
  toggleClass = () => {
    if (this.state.sidebarClass == '') {
      this.setState({ sidebarClass: 'open-side', bodySideClass: 'App body-slide' });
    } else {
      this.setState({ sidebarClass: '', bodySideClass: 'App' });
    }
  }

  // Remove unused elements from the accessibility tree
  removeTabIndex() {
    let mapContainer = document.getElementsByClassName("gm-style")[0];
    if (mapContainer && mapContainer.children && mapContainer.children.length > 0) {
      for (let i = 0; i < mapContainer.children.length; i++) {
        mapContainer.children[i].tabIndex = -1;
      }
    }
  }

  render() {
    return (
      <div className={this.state.bodySideClass}>

        <div className="menu-icon-container" onClick={() => this.toggleClass()}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
        <div className="header" tabIndex="0">Vienna Attractions map</div>

        <Map google={this.props.google} sidebarClass={this.state.sidebarClass} locations={this.state.locations} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBy0WUlrWo-e6GmhrL7Yd9XdH7vMif0Knc'
})(App)
