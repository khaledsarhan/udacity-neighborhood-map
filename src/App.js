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
    this.getAllLocations()
  }

  getAllLocations() {
    PlacesAPI.getAllLocations()
      .then(data => {
        this.setState({ locations: data.response.groups[0].items });
      })
      .catch(err => console.log(err));
  }

  toggleClass = () => {
    if (this.state.sidebarClass == '') {
      this.setState({ sidebarClass: 'open-side', bodySideClass: 'App body-slide' });
    } else {
      this.setState({ sidebarClass: '', bodySideClass: 'App' });
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
        <div className="header">Vienna Attractions map</div>

        <Map google={this.props.google} sidebarClass={this.state.sidebarClass} locations={this.state.locations} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB7-ShBE4Qv6_BXfem3ew1SeJfAOmTozP0'
})(App)
