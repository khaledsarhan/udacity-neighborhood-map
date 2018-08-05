import React, { Component } from 'react'
import Img from 'react-image'

class LocationList extends Component {

    componentDidMount() {
        // window.addEventListener('load', this.props.onLocationsLoaded(this.props.locations));
    }

    render() {
        return (
            <div className="list">
                <ul>
                    {this.props.locations.map((loc, index) => (
                        <li key={loc.id} onClick={() => this.props.onLocationClick(loc)}>
                            <h3>{loc.title}</h3>
                            <p>{loc.details}</p>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default LocationList;