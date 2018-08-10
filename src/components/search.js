import React, { Component } from 'react'
import LocationList from './location-list';

/*
     - This component is responsible for search and view the result for the locations.
*/

class Search extends Component {

    state = {
        searchResult: [],
        query: ''
    }

    /*
      - Filter the locations based on a query and update the state 
        to affect the data in the location-list component.
    */
    searchLocation = (query) => {
        query = query.trim();
        if (query.length <= 0) {
            this.setState({ searchResult: this.props.locations, query: query })
            return;
        }

        if (this.props.locations) {
            let finalLocations = []
            this.props.locations.forEach((loc) => {
                if (loc.venue.name.toLowerCase().includes(query.toLowerCase())) {
                    finalLocations.push(loc);
                }
            });
            this.setState({ searchResult: finalLocations, query: query });
        }
    }

    render() {
        return (
            <div>
                <input className="input-search"
                    type="text"
                    placeholder="Search by attraction name"
                    onChange={e => this.searchLocation(e.target.value)} />
                {this.state.query.length > 0 ? this.props.onLocationLoaded(this.state.searchResult) : this.props.onLocationLoaded(this.props.locations)}
                <LocationList locations={this.state.query.length > 0 ? this.state.searchResult : this.props.locations} onLocationClick={this.props.onLocationClick} />
            </div>
        )
    }

}

export default Search;