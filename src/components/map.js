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
        //console.log(markers[0]);
        // this.state.map.fitBounds(bounds)
        //console.log(bounds);
    }

    openMarkerInfo = (location) => {
        let { infowindow } = this.state
        const marker = this.state.markers.filter((m) => m.id === location.id)[0];
        this.populateInfoWindow(marker, infowindow);
    }

    populateInfoWindow = (marker, infowindow) => {

        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker !== marker) {

            //marker.setIcon(highlightedIcon)
            this.toggleBounce(marker);
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

    toggleBounce = (marker) => {
        const { google } = this.props;
        this.state.markers.map((m) => {
            m.setAnimation(null);
        });
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }

    makeMarkerIcon = (markerColor) => {
        const { google } = this.props
        let markerImage = new google.maps.MarkerImage(
            'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
            '|40|_|%E2%80%A2',
            new google.maps.Size(25, 37),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34),
            new google.maps.Size(25, 37));
        return markerImage;
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
