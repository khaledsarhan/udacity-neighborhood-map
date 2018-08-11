import React, { Component } from 'react'
/*
     - This component is responsible for viewing the list of locations which is passed from the search component.
*/
class LocationList extends Component {
    render() {
        return (
                <ul className="list" tabIndex="0" aria-label="Attraction list">
                    {this.props.locations && this.props.locations.map((loc) => (
                        <li key={loc.venue.id} onClick={() => this.props.onLocationClick(loc)} tabIndex="0">
                            <h3>{loc.venue.name}</h3>
                            <p className="offscreen">Address: {loc.venue.location.formattedAddress[0]}, {loc.venue.location.formattedAddress[1]}, {loc.venue.location.formattedAddress[2]}</p>
                        </li>
                    ))}
                </ul>
        )
    }
}

export default LocationList;