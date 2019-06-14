function createMap(earthquakes) {

  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the earthquakes layer
  var overlayMaps = {
    "Earthquakes": earthquakes
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [lightmap, earthquakes]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {

  // Pull the "earthquakeData" property off of response.data
  var earthquakeData = response.features;
  // Initialize an array to hold bike markers
  var earthquakeMarkers = [];

  // Loop through the earthquakeData array
  for (var i = 0; i< earthquakeData.length; i++)
   {
    var earthquake = earthquakeData[i];

    // For each earthquake, create a marker and bind a popup with the earthquake's name

    var magnitude = earthquake["properties"]["mag"];
    var location = earthquake["properties"]["place"]
    var time = earthquake["properties"]["time"];
    
    if (magnitude < 1) {
      
     earthquakeMarker = L.circle([earthquakeData[i]["geometry"]["coordinates"][1], earthquakeData[i]["geometry"]["coordinates"][0]], 
      {fillColor: "green",
      stroke: false,
      fillOpacity: 0.5,
      radius: (magnitude * 50) + 20000})
      .bindPopup("<h4>" + location + "<br>Magnitude" + magnitude)
    }

    else if (magnitude >=1 && magnitude < 2) {
      earthquakeMarker =  L.circle([earthquakeData[i]["geometry"]["coordinates"][1], earthquakeData[i]["geometry"]["coordinates"][0]],
        {fillColor: "lightgreen",
        stroke: false,
        fillOpacity: 0.5,
        radius: (magnitude * 50) + 40000})
        .bindPopup("<h4>" + location + "<br>Magnitude" + magnitude)  
    }

    else if (magnitude >=2 && magnitude < 3) {
      earthquakeMarker = L.circle([earthquakeData[i]["geometry"]["coordinates"][1], earthquakeData[i]["geometry"]["coordinates"][0]],
        {fillColor: "yellow",
        stroke: false,
        fillOpacity: 0.5,
        radius: (magnitude * 50) + 60000})
        .bindPopup("<h4>" + location + "<br>Magnitude" + magnitude)
    }

    else if (magnitude >=3 && magnitude < 4) {
      earthquakeMarker = L.circle([earthquakeData[i]["geometry"]["coordinates"][1], earthquakeData[i]["geometry"]["coordinates"][0]], 
        {fillColor: "orange",
        stroke: false,
        fillOpacity: 0.5,
        radius: (magnitude * 30) + 80000})
        .bindPopup("<h4>" + location + "<br>Magnitude" + magnitude)
    }

    else if (magnitude >=4 && magnitude < 5) {
      earthquakeMarker = L.circle([earthquakeData[i]["geometry"]["coordinates"][1], earthquakeData[i]["geometry"]["coordinates"][0]],
        {fillColor: "darkorange",
        stroke: false,
        fillOpacity: 0.5,
        radius: (magnitude * 50) + 100000})
        .bindPopup("<h4>" + location + "<br>Magnitude" + magnitude)
    }

    else if (magnitude >=5) {
      earthquakeMarker = L.circle([earthquakeData[i]["geometry"]["coordinates"][1], earthquakeData[i]["geometry"]["coordinates"][0]],
        {fillColor: "red",
        stroke: false,
        fillOpacity: 0.5,
        radius: (magnitude * 50) + 120000})
        .bindPopup("<h4>" + location + "<br>Magnitude" + magnitude)
    }
    // Add the marker to the earthquakeMarkers array
  earthquakeMarkers.push(earthquakeMarker);
  
  }

  // Create a layer group made from the bike markers array, pass it into the createMap function
  createMap(L.layerGroup(earthquakeMarkers));

}

// Perform an API call to the USGS 7 Day All earthqukes API to get earthquake information. Call createMarkers when complete
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", createMarkers);
