var width = 1500,
    height = 800;

svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);

projection = d3.geo.mercator()
    .center([32.0, 1.35])
    .scale(7000)
    .translate([width/2, height/2]);

// Explain what the quantize scale does.
color = d3.scale.quantize().range(["rgb(237,248,233)", "rgb(186,228,179)",
            "rgb(116,196,118)", "rgb(49,163,84)","rgb(0,109,44)"
            ]);

path = d3.geo.path().projection(projection);

d3.json("districts.json", function(json) {

    addRandomDataToDistricts(json.features);

	svg.selectAll("path")
		.data(json.features)
        .enter()
		.append("path")
		.attr("d", path)
		.attr("fill", function(district) {
            var value = district.properties.value;
           	return color(value);
    	});
});

function addRandomDataToDistricts(districts) {
    return districts.map(function(district) {
        district.properties.value = Math.random();
        return district
    })
}