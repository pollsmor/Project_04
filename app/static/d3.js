var svg = d3.select("svg");
var x, y;
var width = 750;
var height = 500;

var days = 300;

$("[data-toggle=tooltip]").tooltip(); //enable Bootstrap tooltips

var rendered = {'cholera-hispaniola-2010': false,
                'covid-19': true,
                'ebola-wafrica-2014' : false,
                'swine-world-2009' : false,
                'sars' : false,
                'measles-2019' : false,
                'measles-2011' : false,
                'cholera-zimbabwe-2008' : false,
                'cholera-yemen-2016' : false,
                'ebola-drcuganda-2018' : false,
                'swine-india-2015' : false,
                'meningitis' : false,
                'mers' : false};

var colors = {'cholera-hispaniola-2010': "BlueViolet",
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

  for (var name in rendered){
    if (rendered[name]){
        svg.append("path")
          .attr("transform", "translate(80, 10)")
          .attr("fill", "none")
          .attr("stroke", colors[name])
          .attr("stroke-width", 1.5)
          .attr("d", line(data[name]));
      }
    };
};

var toggle = function(e){
  name = e.target.getAttribute("data-name");
  rendered[name] = !(rendered[name]);
  svg.selectAll("path").remove();
  render();
};

var eps = document.getElementsByClassName("name");

for (i = 0; i < eps.length; i++){
  eps[i].addEventListener("click", toggle);
};

render();
