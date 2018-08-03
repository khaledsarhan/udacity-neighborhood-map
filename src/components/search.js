import React, { Component } from 'react'
import LocationList from './location-list';
import ReactDOM from 'react-dom'

class Search extends Component {

    state = {
        locations: [
            { title: "St. Stephen's Cathedral", location: { lat: 48.208414, lng: 16.373471 } },
            { title: "Viennese Giant Ferris Wheel", location: { lat: 48.216626, lng: 16.395889 } },
            { title: "Belvedere Palace", location: { lat: 48.191566, lng: 16.380958 } },
            { title: "Schönbrunn Palace", location: { lat: 48.185819, lng: 16.312763 } },
            { title: "Schönbrunn Zoo", location: { lat: 48.182094, lng: 16.302785 } },
            { title: "Volksgarten", location: { lat: 48.208120, lng: 16.361455 } }
        ],
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
                <div>
                    <input
                        type="text"
                        placeholder="Search by location name"
                        onChange={e => this.searchLocation(e.target.value)} />
                </div>
                {this.props.onLocationsLoaded(this.state.searchResult)}
                <LocationList locations={this.state.searchResult}/>
            </div>
        )
    }

}

export default Search;