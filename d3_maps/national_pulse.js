function DataPoint(district, score) {
	this.district = district;
	this.score = score;
}

function fetchData(districts) {
	var dataPoints = [];
	districts.forEach(function(district) {
        var districtName = district.properties.name;
        var randomScore = Math.random();
        var dataPoint = new DataPoint(districtName, randomScore);
		dataPoints.push(dataPoint); 
	});
	return dataPoints;
}

var width = 1500,
    height = 800;

projection = d3.geo.mercator()
    .center([32.0, 1.35])
    .scale(7000)
    .translate([width/2, height/2]);

svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);

color = d3.scale.quantize().range(["rgb(237,248,233)", "rgb(186,228,179)",
            "rgb(116,196,118)", "rgb(49,163,84)","rgb(0,109,44)"
            ]);

path = d3.geo.path().projection(projection);

d3.json("districts.json", function(json) {

    var data = fetchData(json.features);

	data.forEach(function(dataPoint) {
		var district = dataPoint.district;
        var score = parseFloat(dataPoint.score);

        for (var j = 0; j < json.features.length; j++) {
	        var jsonDistrict = json.features[j].properties.name;
	        if (district == jsonDistrict) {
	            json.features[j].properties.value = score;
	            break;
	        }
        }
	});

	svg.selectAll("path")
		.data(json.features)
        .enter()
		.append("path")
		.attr("d", path)
		.attr("fill", function(district) {
            var value = district.properties.value;
           	return color(value);
    	})
        .on('click', function(district) {
            showLocalPollResults(district);
        });
});

function showLocalPollResults(districtJson) {
    console.log(districtJson.properties.name + " clicked!");
    var resultsPopupShowing = false
}