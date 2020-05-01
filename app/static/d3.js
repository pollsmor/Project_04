var renderbutton = document.getElementById('render');
var transitionbutton = document.getElementById('transition');

var svg;
var x,y;
var width = 500;
var height = 500;

var render = function(e){
  var svg = d3.select("svg")
    .attr("width", width)
    .attr("height",height);
  var xAxisScale = d3.scaleLinear()
    .domain([0,10])
    .range([0,width-40]);
  var xAxis = d3.axisBottom()
    .scale(xAxisScale);
  svg.append("g")
    .attr("transform", "translate(25," + (height-20) + ")")
    .call(xAxis);
  var yAxisScale = d3.scaleLinear()
    .domain([0,10])
    .range([height-30,0]);
  var yAxis = d3.axisLeft()
    .scale(yAxisScale);
  svg.append("g")
    .attr("transform", "translate(25, 10)")
    .call(yAxis);
};

var transition = function(e){

};



renderbutton.addEventListener('click', render);
transitionbutton.addEventListener('click', transition);
