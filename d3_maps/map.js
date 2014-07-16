var width = 1500,
    height = 800;

svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);

projection = d3.geo.mercator()
    .center([32.0, 1.35])
    .scale(7000)
    .translate([width / 2, height / 2]);

path = d3.geo.path().projection(projection);

d3.json("districts.json", function(json) {

    svg.selectAll("path")
        .data(json.features)
        // When all path elements have been selected and there is left over elements in features, create a path dom element for each feature
        .enter()
        .append("path")
        .attr("d", path);
});

svg.append("circle")
    .attr("r", 10)
    .attr("cx", 100)
    .attr("cy", 100)
    .attr("fill", "red");