import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Search from './search';

class Map extends Component {

    state = {
        infowindow: new this.props.google.maps.InfoWindow(),
        map: '',
        markers: []
    }

    componentDidMount() {
        this.initMap()
    }

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

        locations.forEach((location) => {
            const marker = new google.maps.Marker({
                position: location.location,
                map: this.state.map,
                title: location.title
            })

            marker.addListener('click', () => {
                this.populateInfoWindow(marker, infowindow)
            })
            bounds.extend(marker.position)
            markers.push(marker);
        })
        this.state.markers = markers;
       // this.state.map.fitBounds(bounds)
       console.log(bounds);
    }

    populateInfoWindow = (marker, infowindow) => {
        // const defaultIcon = marker.getIcon()
        const { highlightedIcon, markers } = this.state
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker !== marker) {
            // reset the color of previous marker
            if (infowindow.marker) {
                const ind = markers.findIndex(m => m.title === infowindow.marker.title)
                //markers[ind].setIcon(defaultIcon)
            }
            // change marker icon color of clicked marker
            //marker.setIcon(highlightedIcon)
            infowindow.marker = marker
            infowindow.setContent(`<h3>${marker.title}</h3>`)
            infowindow.open(this.map, marker)
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function () {
                infowindow.marker = null
            })
        }
    }

    render() {
        return (
            <div>
                <div>
                    <Search onLocationsLoaded={this.addMarkers} />
                </div>
                <div role="application" className="map" ref="map">
                    loading ...
                </div>
            </div>

        )
    }

}

export default Map;
