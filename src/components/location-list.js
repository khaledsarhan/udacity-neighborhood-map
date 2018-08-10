import React, { Component } from 'react'
import Img from 'react-image'
 /*
      - This component is responsible for viewing the list of locations which is passed from the search component.
 */
class LocationList extends Component {

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