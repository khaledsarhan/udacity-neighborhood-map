import React, { Component } from 'react'
import LocationList from './location-list';
import locations from '../data/locations';

class Search extends Component {

    state = {
        locations: locations,
        searchResult: []
    }

    componentDidMount() {
        this.setState({ searchResult: this.state.locations });
    }

    searchLocation = (query) => {
        query = query.trim();
        if (query.length <= 0) {
            this.setState({ searchResult: this.state.locations })
            return;
        }

        let finalLocations = []
        this.state.locations.forEach((loc, i) => {
            if (loc.title.toLowerCase().includes(query.toLowerCase())) {
                finalLocations.push(loc);
            }
        });
        this.setState({ searchResult: finalLocations });
    }

    render() {
        return (
            <div>
                <input className="input-search"
                    type="text"
                    placeholder="Search by attraction name"
                    onChange={e => this.searchLocation(e.target.value)} />
                {this.props.onLocationsLoaded(this.state.searchResult)}
                <LocationList locations={this.state.searchResult} onLocationClick={this.props.onLocationClick} />
            </div>
        )
    }

}

export default Search;