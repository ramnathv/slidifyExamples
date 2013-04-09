function rChart(params, data){
  this.params = params;
  this.data = data;
}

rChart.prototype.drawChart = function(){
  var params = this.params,
      data = this.data;
  var data = d3.nest()
    .key(function(d){return params.group === undefined ? 'main' : d[params.group]})
    .entries(data)
      
  nv.addGraph(function() {
    var chart = nv.models[params.type]()
      .x(function(d) { return d[params.x] })
      .y(function(d) { return d[params.y] })
      .width(900)
      .height(400)
      
    // this code is very hackish. i need a way to specify configuration for each chart.
    if (params.type != 'lineChart' && params.type != 'discreteBarChart' && params.type != 'multiBarHorizontalChart'){
      chart.showControls(true)
    }

    if (params.type != 'discreteBarChart' || params.group != undefined){
      chart.showLegend(true)
    }
      
    d3.select("#" + params.id)
      .append('svg')
      .datum(data)
      .transition().duration(500)
      .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
  });
};


function drawChart(params, data){     
  
  var data = d3.nest()
    .key(function(d){return params.group === undefined ? 'main' : d[params.group]})
    .entries(data)
      
  nv.addGraph(function() {
    var chart = nv.models[params.type]()
      .x(function(d) { return d[params.x] })
      .y(function(d) { return d[params.y] })
      .width(900)
      .height(400)
      
    // this code is very hackish. i need a way to specify configuration for each chart.
    if (params.type != 'lineChart' && params.type != 'discreteBarChart' && params.type != 'multiBarHorizontalChart'){
      chart.showControls(true)
    }

    if (params.type != 'discreteBarChart' || params.group != undefined){
      chart.showLegend(true)
    }  
      
    d3.select("#" + params.id)
      .append('svg')
      .datum(data)
      .transition().duration(500)
      .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
  });
};

function forceDirectedChart(params, data){
  var nodes = {},
      links = data,
      source = params.x,
      target = params.y,
      type   = params.group;
      
  var types = _.uniq(_.pluck(links, type));

  // Compute the distinct nodes from the links.
  links.forEach(function(link) {
    var source = 'source';
    var target = 'target';
    link[source] = nodes[link[source]] || (nodes[link[source]] = {name: link[source]});
    link[target] = nodes[link[target]] || (nodes[link[target]] = {name: link[target]});
  });

  var w = 960,
      h = 500;

  var force = d3.layout.force()
      .nodes(d3.values(nodes))
      .links(links)
      .size([w, h])
      .linkDistance(60)
      .charge(-300)
      .on("tick", tick)
      .start();

  var svg = d3.select("#" + params.id).append("svg:svg")
      .attr("width", w)
      .attr("height", h);

  // Per-type markers, as they don't inherit styles.
  svg.append("svg:defs").selectAll("marker")
      .data(types)
    .enter().append("svg:marker")
      .attr("id", String)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", -1.5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
    .append("svg:path")
      .attr("d", "M0,-5L10,0L0,5");

  var path = svg.append("svg:g").selectAll("path")
      .data(force.links())
    .enter().append("svg:path")
      .attr("class", function(d) { return "link " + d[type]; })
      .attr("marker-end", function(d) { return "url(#" + d[type] + ")"; });

  var circle = svg.append("svg:g").selectAll("circle")
      .data(force.nodes())
    .enter().append("svg:circle")
      .attr("r", 6)
      .call(force.drag);

  var text = svg.append("svg:g").selectAll("g")
      .data(force.nodes())
    .enter().append("svg:g");

  // A copy of the text with a thick white stroke for legibility.
  text.append("svg:text")
      .attr("x", 8)
      .attr("y", ".31em")
      .attr("class", "shadow")
      .text(function(d) { return d.name; });

  text.append("svg:text")
      .attr("x", 8)
      .attr("y", ".31em")
      .text(function(d) { return d.name; });

  // Use elliptical arc path segments to doubly-encode directionality.
  function tick() {
    path.attr("d", function(d) {
      var dx = d.target.x - d.source.x,
          dy = d.target.y - d.source.y,
          dr = Math.sqrt(dx * dx + dy * dy);
      return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
    });

    circle.attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    });

    text.attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    });
  }
};


function parallelCoordinates(params, data){
  var id = params.id,
    color_by = params.color,
    colors = params.colors
    
  // linear color scale
  var blue_to_brown = d3.scale.linear()
    .domain([9, 50])
    .range(colors)
    .interpolate(d3.interpolateLab);

  // interact with this variable from a javascript console
  var pc1 = d3.parcoords()("#" + id)
    .data(data)
    .color(function(d) { 
      return blue_to_brown(d[color_by]); 
    })  // quantitative color scale
    .alpha(0.4)
    .render()
    .brushable()  // enable brushing
    .interactive()  // command line mode

  var explore_count = 0;
  var exploring = {};
  var explore_start = false;
  pc1.svg
    .selectAll(".dimension")
    .style("cursor", "pointer")
    .on("click", function(d) {
      exploring[d] = d in exploring ? false : true;
      event.preventDefault();
      if (exploring[d]) d3.timer(explore(d,explore_count));
    });

  function explore(dimension,count) {
    if (!explore_start) {
      explore_start = true;
      d3.timer(pc1.brush);
    }
    var speed = (Math.round(Math.random()) ? 1 : -1) * (Math.random()+0.5);
    return function(t) {
      if (!exploring[dimension]) return true;
      var domain = pc1.yscale[dimension].domain();
      var width = (domain[1] - domain[0])/4;
      var center = width*1.5*(1+Math.sin(speed*t/1200)) + domain[0];
      pc1.yscale[dimension].brush.extent([
        d3.max([center-width*0.01, domain[0]-width/400]),  
        d3.min([center+width*1.01, domain[1]+width/100])  
      ])(pc1.g()
          .filter(function(d) {
          return d == dimension;
        })
      );
    };
  };
};
