import React, { Component } from 'react'

class LocationList extends Component {

    componentDidMount() {
       // window.addEventListener('load', this.props.onLocationsLoaded(this.props.locations));
    }

    render() {
        return (
            <div className="list">
                <ul>
                    {this.props.locations.map((loc, index) => (
                        <li key={loc.id}><button onClick={() => this.props.onLocationClick(loc)}>{loc.title}</button></li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default LocationList;