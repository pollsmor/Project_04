var svg;
var x,y;
var width = 500;
var height = 500;

var render = function() {
  var svg = d3.select("svg")
    .attr("width", width)
    .attr("height",height);
  var xAxisScale = d3.scaleLinear()
    .domain([0,10])
    .range([0,width-50]);
  var xAxis = d3.axisBottom()
    .scale(xAxisScale);
  svg.append("g")
    .attr("transform", "translate(35," + (height-40) + ")")
    .call(xAxis);
  var yAxisScale = d3.scaleLinear()
    .domain([0,10])
    .range([height-50,0]);
  var yAxis = d3.axisLeft()
    .scale(yAxisScale);
  svg.append("g")
    .attr("transform", "translate(35, 10)")
    .call(yAxis);
  svg.append("text")
    .style("text-anchor","middle")
    .attr("transform", "translate(" + (width/2) + "," + (height-5) + ")")
    .text("Days since beginning of outbreak");
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y",  15)
        .attr("x",-(height / 2))
        .style("text-anchor", "middle")
        .text("Deaths per day");
};

render();
