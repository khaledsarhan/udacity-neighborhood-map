import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Search from './search';


 /*
      - This is the main component which will include the map with markers, search input and the locations list.
      - All actions associated with the map has been done here (initMap, addMarkers, PopulateInfoWindow).
 */

class Map extends Component {

    state = {
        infowindow: new this.props.google.maps.InfoWindow(),
        map: '',
        markers: []
    }

    componentDidMount() {
        this.initMap()
    }

    /*
     - Create the map with its configurations
    */
    initMap() {
        if (this.props && this.props.google) {
            const { google } = this.props
            const maps = google.maps

            const mapRef = this.refs.map
            const node = ReactDOM.findDOMNode(mapRef)

            const mapConfig = Object.assign({}, {
                zoom: 12,
                center: { lat: 48.206875, lng: 16.370751 },
                mapTypeControl: false
            })

            this.map = new maps.Map(node, mapConfig)
            this.setState({ map: this.map })
        }
    }

    /*
        - Add markers for the assigned locations to the map.
        - This has been called when the location list has been loaded.
   */
    addMarkers = (locations) => {
        const { google } = this.props
        let { infowindow } = this.state
        const bounds = new google.maps.LatLngBounds()
        let markers = [];

        if (this.state.markers && this.state.markers.length > 0) {
            this.state.markers.map((marker) => {
                marker.setMap(null)
            })
        }

        // Loop through all location to add its own marker
        locations.forEach((location) => {
            const marker = new google.maps.Marker({
                position: location.location,
                map: this.state.map,
                title: location.title,
                id: location.id,
                details: location.details
            })

            marker.addListener('click', () => {
                this.populateInfoWindow(marker, infowindow)
            })
            bounds.extend(marker.position)
            markers.push(marker);
        })
        this.state.markers = markers;
    }

    /*
        - Open a window info for specific location.
        - This has been called when the location has been clicked in the list view.
   */
    openMarkerInfo = (location) => {
        let { infowindow } = this.state
        const marker = this.state.markers.filter((m) => m.id === location.id)[0];
        this.populateInfoWindow(marker, infowindow);
    }

    populateInfoWindow = (marker, infowindow) => {

        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker !== marker) {
            this.toggleBounce(marker); // Add animation to the selected marker
            infowindow.marker = marker
            infowindow.setContent(`<div class="infowindow"><h3>${marker.title}</h3><p>${marker.details}</p></div>`)
            infowindow.open(this.map, marker)
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function () {
                if (this.marker) {
                    this.marker.setAnimation(null);
                    this.marker = null;
                }
            });
        }
    }

    /*
      - Remove the animation for all markers and add it to the selected one.
    */
    toggleBounce = (marker) => {
        const { google } = this.props;
        this.state.markers.map((m) => {
            m.setAnimation(null);
        });
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }

    render() {
        return (
            <div className="container">
                <div id="sidebar" className={this.props.sidebarClass}>
                    <Search onLocationsLoaded={this.addMarkers} onLocationClick={this.openMarkerInfo} />
                </div>
                <div role="application" className="map" ref="map">
                    loading ...
                </div>
            </div >

        )
    }

}

export default Map;
