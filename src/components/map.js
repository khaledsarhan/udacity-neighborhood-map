import React, { Component } from 'react'
import ReactDOM from 'react-dom'


class Map extends Component {

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
            //this.addMarkers()
        }
    }

    render() {
        return (
            <div role="application" className="map" ref="map">
                loading map...
            </div>

        )
    }

}

export default Map;
