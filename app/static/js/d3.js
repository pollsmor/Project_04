$("[data-toggle=tooltip]").tooltip(); //enable Bootstrap tooltips
const svg = d3.select("svg");
var height = $(window).height() * 0.5;
var width = $(window).width() - 10;
var x, y; //x and y-axis scaling

var days = 300;
var selectedDay; //for vertical line
var daysPicker = document.getElementById("days");
var cells = document.getElementsByClassName("deaths");

//Don't want to transition when changing the days via the arrows
//DO want a transition with a big jump (i.e. 800 days, turning off an epidemic's line)
var transition = false;

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
        //Only disease higher than COVID-19 by day 113 is the 2009 Swine Flu pandemic.
        return Math.floor(Math.max(data['swine-world-2009'][days - 1]['deaths'], 177459) * 1.2);
      }


      //For some reason if I don't use parseInt() JS thinks something stupid like 321 > 2708 is true
      if (parseInt(data[name][days - 1]['deaths']) > parseInt(max)) {
        max = parseInt(data[name][days - 1]['deaths']);
      }
    }
  }

  return Math.floor(max * 1.2);
}

var getDayData = function(day) { //helper function for multi-line interactivity
  var d = [];

  for (var name in rendered) {
    if (name === "covid-19" && day > 113) continue; //since COVID-19's data stops on day 113
    d.push(parseInt(data[name][day - 1]['deaths']));
  }

  return d;
}

var updateTable = function(day) { //helper function for multi-line interactivity
  var dayData = getDayData(day);

  if (dayData.length == 13) {
    for (var i = 0; i < 13; i++) {
      cells[i].innerHTML = dayData[i];
    }
  } else { //COVID-19's data is missing
    cells[0].innerHTML = dayData[0];
    cells[1].innerHTML = "N/A";
    for (var i = 2; i < 13; i++) {
      cells[i].innerHTML = dayData[i - 1];
    }
  }
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

  if (transition) {
    svg.append("g")
      .attr("transform", "translate(80, 10)")
      .transition()
      .call(yAxis);
  } else {
    svg.append("g")
      .attr("transform", "translate(80, 10)")
      .call(yAxis);
  }

  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y",  25)
      .attr("x", -(height / 2))
      .style("text-anchor", "middle")
      .text("Total Deaths");
  // ==========================================================================

  var mouseG = svg.append("g");
  mouseG.append("path") //black vertical bar that follows mouse movement
    .attr("class", "mouse-line")
    .style("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", "0");

  mouseG.append("svg:rect") //append a rect to catch mouse movements
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .on("mouseout", function() {
      d3.select(".mouse-line").style("opacity", "0");
    })
    .on("mouseover", function() {
      d3.select(".mouse-line").style("opacity", "1");
    })
    .on("mousemove", function() {
      var mouse = d3.mouse(this);
      d3.select(".mouse-line")
      .attr("d", function() {
        var d = "M" + mouse[0] + "," + (height - 40);
        d += " " + mouse[0] + "," + 0;
        return d;
      });

      var day = Math.floor(x.invert(d3.mouse(this)[0] - 80));
      updateTable(day);
      document.getElementById("daynum").innerHTML = day;
  });

  for (var name in rendered) {
    if (rendered[name]) {
      var temp = name;
        if (transition) {
          svg.append("path")
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
            .transition()
              .attr("class", "graph-line")
              .attr("transform", "translate(80, 10)")
              .attr("name", name)
              .attr("fill", "none")
              .attr("stroke", colors[name])
              .attr("stroke-width", 3)
              .attr("d", line(data[name]))
        } else {
          svg.append("path")
              .attr("class", "graph-line")
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
              });
        }
    }
  }

  transition = false;
}

var linesEnabled = function() {
  var enabled = 0;

  for (var name in rendered)
    if (rendered[name]) enabled++;

  return enabled;
}

var toggle = function(e) {
  var name = e.target.getAttribute("data-name");
  rendered[name] = !(rendered[name]);
  if (linesEnabled() <= 0) {
    rendered[name] = true;
    alert("At least one epidemic must be shown.");
    return;
  }

  if (e.target.style.color === "gray") e.target.style.color = 'black';
  else e.target.style.color = "gray";

  e.target.style["font-weight"] = "normal";
  transition = true;
  render();
};

const eps = document.getElementsByClassName("name");

for (i = 0; i < eps.length; i++) {
  eps[i].addEventListener("click", toggle);

  eps[i].addEventListener("mouseover", function(e) {
    var name = e.target.getAttribute("data-name");
    if (!rendered[name]) return; //this really isn't but helpful for suppressing an error
    this.style["font-weight"] = "bold";
    var graphLine = document.querySelector("[name=" + name + "]");
    graphLine.style["stroke-width"] = 4.5;
  });

  eps[i].addEventListener("mouseout", function(e) {
    var name = e.target.getAttribute("data-name");
    if (!rendered[name]) return;
    this.style["font-weight"] = "normal";
    var graphLine = document.querySelector("[name=" + name + "]");
    graphLine.style["stroke-width"] = 3;
  });
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
  transition = true;
  render();
});

document.getElementById("300days").addEventListener("click", function() {
  daysPicker.valueAsNumber = 300;
  days = 300;
  transition = true;
  render();
});

document.getElementById("800days").addEventListener("click", function() {
  daysPicker.valueAsNumber = 800;
  days = 800;
  transition = true;
  render();
});

render();
