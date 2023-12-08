function createMap(earthquakes) {
    // Create the tile layer that will be the background of our map.
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
    // Create a baseMaps object to hold the streetmap layer.
    let baseMaps = {
      "Street Map": streetmap
    };
  
    // Create an overlayMaps object to hold the earthquakes layer.
    let overlayMaps = {
      "Earthquakes": earthquakes
    };
  
    // Create the map object with options.
    let map = L.map("map", {
      center: [40.73, -74.0059],
      zoom: 3,
      layers: [streetmap, earthquakes]
    });
  
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  
    // Set up the legend.
let legend = L.control({ position: "bottomright" });
legend.onAdd = function () {
  let div = L.DomUtil.create("div", "info legend");
  let grades = [0, 10, 30, 50, 70, 90]; 
  let colors = ['#fee08b', '#d73027', '#4575b4', '#313695', '#810f7c', '#4d004b'];
  let labels = [];

  // Add a title to the legend.
  div.innerHTML = "<h1>Earthquake Depth</h1>";

  // Add the minimum and maximum labels.
  div.innerHTML += '<div class="labels">' +
    '<div class="min">' + grades[0] + '</div>' +
    '<div class="max">' + grades[grades.length - 1] + '</div>' +
    '</div>';

  // Create color indicators for each range.
  grades.forEach(function (grade, index) {
    labels.push(
      '<li style="background-color:' + colors[index] + '"></li> ' +
      grades[index] + (grades[index + 1] ? '&ndash;' + grades[index + 1] + '<br>' : '+')
    );
  });

  // Add the color indicators to the legend.
  div.innerHTML += '<ul>' +labels.join('') +  '</ul>';

  return div;
};

// Add the legend to the map.
legend.addTo(map);
}
  
  function createMarkers(response) {
    // Pull the earthquake features from the GeoJSON response.
    let earthquakes = L.geoJSON(response.features, {
      pointToLayer: function (feature, latlng) {
        // Size based on magnitude, color based on depth.
        let radius = feature.properties.mag * 5; // scaling factor
        let color = getColor(feature.geometry.coordinates[2]); // Depth
  
        // Return a circle marker with the specified radius and color.
        return L.circleMarker(latlng, {
          radius: radius,
          fillColor: color,
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        });
      },
      onEachFeature: function (feature, layer) {
        // Add a popup with earthquake information.
        layer.bindPopup(
          "<h3>Magnitude: " + feature.properties.mag +
          "</h3><h3>Location: " + feature.properties.place +
          "</h3><h3>Depth: " + feature.geometry.coordinates[2] + "</h3>"
        );
      }
    });
  
    // Create the map with the earthquakes layer.
    createMap(earthquakes);
  }
  
  function getColor(depth) {
    // Define color ranges based on depth.
    return depth > 90 ? '#4d004b' :
           depth > 70 ? '#810f7c' :
           depth > 50 ? '#313695' :
           depth > 30 ? '#4575b4' :
           depth > 10 ? '#d73027' :
                        '#fee08b';
  }
  
  // Perform an API call to the USGS Earthquake GeoJSON API. Call createMarkers when it completes.
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson").then(createMarkers);
  