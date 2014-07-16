var width = 1500,
    height = 800;

projection = d3.geo.mercator()
    .center([32.0, 1.35])
    .scale(7000)
    .translate([width/2, height/2]);

svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);

path = d3.geo.path().projection(projection);

d3.json("districts.json", function(json) {

	svg.selectAll("path")
		.data(json.features)
        .enter()
		.append("path")
		.attr("d", path)
        .attr("fill", function() {
            return "rgb(0,0,0)";
        });
});