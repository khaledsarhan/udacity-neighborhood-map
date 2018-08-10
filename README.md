# MyReads Project

This is neighborhood map project, one of the **Udacity** front end web development nanodegree projects.

# Definition

* Neighborhood map application is useful for viewing interesting locations in the map associated with
  a list view which will contain more information about each location.
* Good examples of these locations are city attractions, best restaurants and so on.

## Queck Start

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`
* with your server running, visit the site: http://localhost:3000 if not open automatically

## Main files

There are main files which can help to start understand the scenario of the code

## What You're Getting
```bash
 src
    ├── components
                  ├── location-list.js # It includes all the information about the locations which will                         be passed from the search component.
                  ├── map.js # This is the main component which will include the map with markers,                    search input and the locations list.
                             # All actions associated with the map has been done here (initMap,            addMarkers, PopulateInfoWindow).
                  ├── search.js # This component is responsible for search and view the result for the                   locations.
                                # Based on the query search input the location will be filtered and        passed to the location-list component.
    ├── data
            ├── placesAPI.js # This file includes functions to load the information about the locations                     which we can use to display it in the map and the list view (We are using                    an external api as a source for our data).
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of the app.
               # Location list has beed loaded here and passed to child components.
    ├── index.css # Global styles.
    └── index.js # It is used for DOM rendering only.