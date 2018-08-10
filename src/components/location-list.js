import React, { Component } from 'react'
/*
     - This component is responsible for viewing the list of locations which is passed from the search component.
*/
class LocationList extends Component {
    render() {
        return (
            <div className="list">
                <ul>
                    {this.props.locations && this.props.locations.map((loc) => (
                        <li key={loc.venue.id} onClick={() => this.props.onLocationClick(loc)}>
                            <h3>{loc.venue.name}</h3>
                        </li>
                    ))}
                </ul>
            </div >
        )
    }
}

export default LocationList;