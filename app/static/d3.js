var svg = d3.select("svg");
var x, y;
var width = 750;
var height = 500;

var days = 300;

$("[data-toggle=tooltip]").tooltip(); //enable Bootstrap tooltips

var render = function() {
  svg.attr("width", width).attr("height", height);

  var x = d3.scaleLinear()
    .domain([1, days])
    .range([0, width - 50]);
  var xAxis = d3.axisBottom()
    .scale(x);
  svg.append("g")
      .attr("transform", "translate(80," + (height - 40) + ")")
    .call(xAxis);
  svg.append("text")
      .style("text-anchor","middle")
      .attr("transform", "translate(" + (width / 2) + "," + (height - 5) + ")")
    .text("Days since beginning of outbreak");

  var y = d3.scaleLinear()
    .domain([0, 200000])
    .range([height - 50, 0]);
  var yAxis = d3.axisLeft()
    .scale(y);
  svg.append("g")
      .attr("transform", "translate(80, 10)")
    .call(yAxis);
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y",  15)
      .attr("x",-(height / 2))
      .style("text-anchor", "middle")
      .text("Deaths per day");

  var line = d3.line()
    .x(d => x(d.day))
    .y(d => y(d.deaths));

  svg.append("path")
      .attr("transform", "translate(80, 10)")
      .attr("fill", "none")
      .attr("stroke", "DodgerBlue")
      .attr("stroke-width", 1.5)
      .attr("d", line(data['covid-19']));

  svg.append("path")
      .attr("transform", "translate(80, 10)")
      .attr("fill", "none")
      .attr("stroke", "DarkSlateGray")
      .attr("stroke-width", 1.5)
      .attr("d", line(data['swine-world-2009']));
};

render();
