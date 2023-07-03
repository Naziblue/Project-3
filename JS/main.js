// Create the map
var map = L.map('map').setView([0, 0], 2);
var markers = L.layerGroup().addTo(map);
var colorDescriptions = {
  gray: 'Score 0-20',
  red: 'Score 21-30',
  orange: 'Score 31-40',
  yellow: 'Score 41-50',
  green: 'Score 51-60',
  blue: 'Score 61-100',
};


L.Control.geocoder({
  collapsed: false, // Keep the search bar visible
  placeholder: "Search for a city...", 
  errorMessage: "City not found.", 
}).addTo(map);

// Add the tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(map);

var legendControl = L.control({ position: 'bottomright' });

legendControl.onAdd = function(map) {
  var legendContainer = L.DomUtil.create('div', 'legend');
  createLegend(legendContainer);
  return legendContainer;
};
// Function to create the legend content
function createLegend(container) {
  var legendContent = '<h4>Legend</h4>';

  for (var color in colorDescriptions) {
    var description = colorDescriptions[color];
    legendContent += '<span class="legend-item"><i style="background:' + color + '"></i>' + description + '</span>';
  }

  container.innerHTML = legendContent;
}
legendControl.addTo(map);

var colorCategories = {
  gray: { total_Safety: 0, total_cost:0, count: 0 },
  red: { total_Safety: 0, total_cost:0, count: 0},
  orange: { total_Safety: 0, total_cost:0, count: 0 },
  yellow: { total_Safety: 0, total_cost:0, count: 0},
  green: { total_Safety: 0, total_cost:0, count: 0 },
  blue: { total_Safety: 0, total_cost:0, count: 0 },
};

// Fetch data from Flask API
fetch('http://127.0.0.1:5000')
  .then(response => response.json())
  .then(data => {
    markers.clearLayers();
    // Loop through the city data and add CircleMarkers to the map
    data.forEach(city => {
      var score = city.teleport_city_score;
      var cost_score = city.cost_of_living_score;
      var safety_score = city.safety_score;
      var color;
      if (score >= 0 && score <= 20) {
        color = 'gray';
      } else if (score > 20 && score <= 30) {
        color = 'red';
      }else if (score > 30 && score <= 40) {
        color = 'orange';
      }else if (score > 40 && score <= 50) {
        color = 'yellow';
      }else if (score > 50 && score <= 60) {
        color = 'green';
      } else if (score > 60 && score <= 100) {
        color = 'blue';
      } else {
        color = 'gray'; // Default color for invalid scores
      }
      colorCategories[color].total_cost += cost_score;
      colorCategories[color].total_Safety += safety_score;
      colorCategories[color].count+=1;


      var marker = L.marker([city.latitude, city.longitude], {
        icon: L.AwesomeMarkers.icon({
          icon: 'circle',
          markerColor: color,
          prefix: 'fa',
          spin: true,
        }),
        score: score, // Pass the score here
      }).addTo(map);

      marker.bindPopup('<b>' + city.city + '</b><br>Total Score: ' + city.teleport_city_score.toFixed(3) );
      markers.addLayer(marker);
    });

    var costAverages = {};
for (var color of ['blue', 'green', 'yellow', 'orange']) {
  costAverages[color] = colorCategories[color].total_cost / colorCategories[color].count;
}

var safetyAverages = {};
for (var color of ['blue', 'green', 'yellow', 'orange']) {
  safetyAverages[color] = colorCategories[color].total_Safety / colorCategories[color].count;
}

var ctx = document.getElementById('barChart2').getContext('2d');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: Object.keys(safetyAverages),
    datasets: [{
      label: 'Average Safety Score',
      data: Object.values(safetyAverages),
      backgroundColor: Object.keys(safetyAverages),
    }],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});



  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '©OpenStreetMap, ©CartoDB',
  maxZoom: 18,
}).addTo(map).on('add', function(){
  var svgElement = this.getElement();
  svgElement.classList.add('marker-glow');
});

var ctx = document.getElementById('barChart').getContext('2d');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: Object.keys(costAverages),
    datasets: [{
      label: 'Average Cost Score',
      data: Object.values(costAverages),
      backgroundColor: Object.keys(costAverages),
    }],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

  })
  .catch(error => {
    console.log('Error:', error);
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '©OpenStreetMap, ©CartoDB',
  maxZoom: 18,
}).addTo(map).on('add', function(){
  var svgElement = this.getElement();
  svgElement.classList.add('marker-glow');
});



// Function to update the displayed markers based on the minimum slider value
function updateMinSliderValue(value) {
  var minSliderValue = Number(value);
  document.getElementById('minSliderValue').innerText = minSliderValue;

  console.log('minSliderValue:', minSliderValue); 

  // Filter the markers
  markers.eachLayer(function(marker) {
    console.log('marker.options.score:', marker.options.score); 
    if (marker.options.score >= minSliderValue && marker.options.score <= Number(document.getElementById('maxScoreSlider').value)) {
      marker.addTo(map);
    } else {
      map.removeLayer(marker);
    }
  });
}

// Function to update the displayed markers based on the maximum slider value
function updateMaxSliderValue(value) {
  var maxSliderValue = Number(value);
  document.getElementById('maxSliderValue').innerText = maxSliderValue;

  console.log('maxSliderValue:', maxSliderValue); 

  // Filter the markers
  markers.eachLayer(function(marker) {
    console.log('marker.options.score:', marker.options.score); 
    if (marker.options.score >= Number(document.getElementById('minScoreSlider').value) && marker.options.score <= maxSliderValue) {
      marker.addTo(map);
    } else {
      map.removeLayer(marker);
    }
  });
}





