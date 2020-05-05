$("[data-toggle=tooltip]").tooltip(); //enable Bootstrap tooltips
const svg = d3.select("svg");
var height = 500;
var width = 750;
var x, y; //x and y-axis scaling
var days = 100;

const line = d3.line() //line generator
  .x(d => x(d.day))
  .y(d => y(d.deaths));

var rendered = {'cholera-hispaniola-2010': true,
                'covid-19': true,
                'ebola-wafrica-2014' : true,
                'swine-world-2009' : true,
                'sars' : true,
                'measles-2019' : true,
                'measles-2011' : true,
                'cholera-zimbabwe-2008' : true,
                'cholera-yemen-2016' : true,
                'ebola-drcuganda-2018' : true,
                'swine-india-2015' : true,
                'meningitis' : true,
                'mers' : true};

const colors = {'cholera-hispaniola-2010': "BlueViolet",
              'covid-19': "DodgerBlue",
              'ebola-wafrica-2014' : "DarkGreen",
              'swine-world-2009' : "DarkSlateGray",
              'sars' : "Gold",
              'measles-2019' : "IndianRed",
              'measles-2011' : "HotPink",
              'cholera-zimbabwe-2008' : "SandyBrown",
              'cholera-yemen-2016' : "Silver",
              'ebola-drcuganda-2018' : "GoldenRod",
              'swine-india-2015' : "SteelBlue",
              'meningitis' : "SpringGreen",
              'mers' : "Thistle"};

var render = function() {
  svg.attr("width", width).attr("height", height);

  //X-axis =====================================================================
  x = d3.scaleLinear()
    .domain([1, days])
    .range([0, width - 50]);

  var xAxis = d3.axisBottom().scale(x);

  svg.append("g")
      .attr("transform", "translate(80," + (height - 40) + ")")
    .call(xAxis);

  svg.append("text")
      .style("text-anchor","middle")
      .attr("transform", "translate(" + (width / 2) + "," + (height - 5) + ")")
    .text("Days since beginning of outbreak");
  // ===========================================================================

  //Y-axis =====================================================================
  y = d3.scalePow()
    .exponent(.2)
    .domain([0, 200000])
    .range([height - 50, 0]);

  var yAxis = d3.axisLeft().scale(y);

  svg.append("g")
      .attr("transform", "translate(80, 10)")
    .call(yAxis);

  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y",  20)
      .attr("x", -(height / 2))
      .style("text-anchor", "middle")
      .text("Total Deaths");
  // ===========================================================================

  for (var name in rendered) {
    if (rendered[name]) {
        svg.append("path")
          .attr("transform", "translate(80, 10)")
          .attr("fill", "none")
          .attr("stroke", colors[name])
          .attr("stroke-width", 1.5)
          .attr("d", line(data[name]));
    }
  };
};

var toggle = function(e) {
  if (e.target.style.color === "gray") e.target.style.color = 'black';
  else e.target.style.color = "gray";

  name = e.target.getAttribute("data-name");
  rendered[name] = !(rendered[name]);
  svg.selectAll("path").remove();
  render();
};

const eps = document.getElementsByClassName("name");

for (i = 0; i < eps.length; i++) {
  eps[i].addEventListener("click", toggle);
};

render();
