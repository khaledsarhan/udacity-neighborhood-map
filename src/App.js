import React, { Component } from 'react';
import './App.css';
import { GoogleApiWrapper } from 'google-maps-react'
import Map from './components/map'

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Map google={this.props.google} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB7-ShBE4Qv6_BXfem3ew1SeJfAOmTozP0'
})(App)
