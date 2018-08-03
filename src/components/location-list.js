import React, { Component } from 'react'

const LocationList = ({ locations, onLocationClick }) => {

    return (
        <div className="list">
            <ul>
                {locations.map(loc => {
                    <li onClick={onLocationClick}>loc.title</li>
                })}
            </ul>
        </div>
    )
}

export default LocationList;