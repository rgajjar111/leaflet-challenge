# leaflet-challenge
## USGS Earthquake Data Visualization
This interactive web application aims to visualize earthquake data sourced from the United States Geological Survey (USGS). The dataset contains comprehensive information about earthquakes worldwide in the past day, including their magnitudes, locations, and depths. By utilizing this tool, users can gain valuable insights into the global distribution and characteristics of seismic events.

This site is hosted on [GitHub Pages](https://rgajjar111.github.io/leaflet-challenge/)

## Getting Started
Explore the Map:  explore the interactive map that plots earthquake locations based on their latitude and longitude. The markers on the map reflect the magnitude of the earthquakes through size and their depth through color.

Popups and Legends: Click on the markers to view additional information about each earthquake. The legend provides context for interpreting earthquake magnitudes and depths.

## Code Overview
Data Retrieval
The d3.json function is employed to fetch earthquake data from the USGS GeoJSON Feed. The data is updated regularly to ensure the latest information is visualized.

### Map Initialization
The createMap function initializes the Leaflet map and sets up the base layer with street map tiles. It also incorporates the earthquake layer for visualization.

### Marker Creation
The createMarkers function uses Leaflet and GeoJSON to create circle markers for each earthquake. The markers' size corresponds to the earthquake magnitude, while their color indicates the depth.

### Legend
A legend is included in the bottom right corner of the map, providing a visual guide for interpreting earthquake depths.

### Dependencies
Leaflet: Utilized for creating an interactive map.
D3.js: Used for data manipulation and fetching.

### Usage
This visualization tool offers an intuitive interface to explore earthquake data globally. Select different datasets, interact with the map, and click on markers to access detailed information about each earthquake. Gain a better understanding of the patterns and characteristics of seismic activity around the world.
