function DataPoint(district, score) {
	this.district = district;
	this.score = score;
}

function fetch_data(districts) {
	var dataPoints = [];
	districts.forEach(function(district) {
        var districtName = district.properties.name;
        var randomScore = Math.random();
        var dataPoint = new DataPoint(districtName, randomScore);
		dataPoints.push(dataPoint); 
	});
	return dataPoints;
}

projection = d3.geo.mercator()
    .center([30, 0])
    .scale(2850)
//    .center([30.30, 7.25])
//    .scale(2000)
    ;

svg = d3.select("#map").append("svg:svg")
        .attr("width", 2000)
        .attr("height", 550);

color = d3.scale.quantize().range(["rgb(237,248,233)", "rgb(186,228,179)",
            "rgb(116,196,118)", "rgb(49,163,84)","rgb(0,109,44)"
            ]);

path = d3.geo.path().projection(projection);

d3.json("districts.json", function(json) {

    var data = fetch_data(json.features);

	data.forEach(function(dataPoint) {
		var district = dataPoint.district;
        var score = parseFloat(dataPoint.score);

        //Find the corresponding district inside the GeoJSON
        for (var j = 0; j < json.features.length; j++) {
	        var jsonDistrict = json.features[j].properties.name;
	        if (district == jsonDistrict) {
	            //Copy the data value into the JSON
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
		.style("fill", function(district) {
	        //Get data value
            var value = district.properties.value;
           	return color(value);
    	})
    	;
});	
