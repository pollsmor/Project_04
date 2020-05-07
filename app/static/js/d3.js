$("[data-toggle=tooltip]").tooltip(); //enable Bootstrap tooltips
const svg = d3.select("svg");
var height = 500;
var width = $(window).width() - 80;
var x, y; //x and y-axis scaling

var days = 300;
var daysPicker = document.getElementById("days");

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

var clear = function() {
  svg.selectAll("*").remove();
}

//Helper function to determine domain for Y-axis in render function
var getYMax = function() {
  var max = 0;

  for (var name in rendered) {
    if (rendered[name]) {
      if (name === "covid-19" && days > 113) {
        //Only disease higher than COVID-19 by day 112 is the 2009 Swine Flu pandemic.
        return Math.floor(Math.max(data['swine-world-2009'][days - 1]['deaths'], 177459) * 1.2);
      }


      //For some reason if I don't use parseInt() JS thinks something stupid like 2708 > 321 is true
      if (parseInt(data[name][days - 1]['deaths']) > parseInt(max)) {
        max = parseInt(data[name][days - 1]['deaths']);
      }
    }
  }

  return Math.floor(max * 1.2);
}

var render = function() {
  clear();
  svg.attr("width", width).attr("height", height);

  //X-axis =====================================================================
  x = d3.scaleLinear()
    .domain([1, days])
    .range([0, width - 80]);

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

  var yMax = getYMax();
  console.log("Y-max: " + yMax);
  y = d3.scalePow()
    .exponent(0.2)
    .domain([0, yMax])
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
      var temp = name;
        svg.append("path")
          .attr("transform", "translate(80, 10)")
          .attr("name", name)
          .attr("fill", "none")
          .attr("stroke", colors[name])
          .attr("stroke-width", 3)
          .attr("d", line(data[name]))
          .on("mouseover", function() {
            d3.select(this).style("stroke-width", 4.5);
            var name = d3.select(this).attr("name");
            var el = document.querySelector("[data-name=" + name + "]");
            el.style['font-weight'] = "bold";
          })
          .on("mouseout", function() {
            d3.select(this).style("stroke-width", 3);
            var name = d3.select(this).attr("name");
            var el = document.querySelector("[data-name=" + name + "]");
            el.style['font-weight'] = "normal";
          })
          .on("click", function() {
            var name = d3.select(this).attr("name");
            var el = document.querySelector("[data-name=" + name + "]");
            el.style['font-weight'] = "normal";
            el.click();
          })
    }
  }
};

var linesEnabled = function() {
  var enabled = 0;

  for (var name in rendered)
    if (rendered[name]) enabled++;

  return enabled;
}

var toggle = function(e) {
  name = e.target.getAttribute("data-name");
  rendered[name] = !(rendered[name]);
  if (linesEnabled() <= 0) {
    rendered[name] = true;
    alert("At least one epidemic must be shown.");
    return;
  }
  if (e.target.style.color === "gray") e.target.style.color = 'black';
  else e.target.style.color = "gray";
  render();
};

const eps = document.getElementsByClassName("name");

for (i = 0; i < eps.length; i++) {
  eps[i].addEventListener("click", toggle);
};

var daysPicker = document.getElementById("days");
daysPicker.addEventListener("input", function() {
  days = daysPicker.valueAsNumber;
  if (days > 800) {
    daysPicker.valueAsNumber = 800;
    days = 800;
  } else if (days < 50) {
    daysPicker.valueAsNumber = 50;
    days = 50;
  }

  render();
});

document.getElementById("50days").addEventListener("click", function() {
  daysPicker.valueAsNumber = 50;
  days = 50;
  render();
});

document.getElementById("300days").addEventListener("click", function() {
  daysPicker.valueAsNumber = 300;
  days = 300;
  render();
});

document.getElementById("800days").addEventListener("click", function() {
  daysPicker.valueAsNumber = 800;
  days = 800;
  render();
});

render();
