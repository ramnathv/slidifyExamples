function drawNVD3Plot(){  
  var params = {{{ params }}},
    data = {{{ data }}}
  
  var data = d3.nest()
    .key(function(d){
      return params.group === undefined ? 'main' : d[params.group]
    })
    .entries(data)
      
  nv.addGraph(function() {
    var chart = nv.models[params.type]()
      .x(function(d) { return d[params.x] })
      .y(function(d) { return d[params.y] })
      .width(900)
      .height(400)
      
    d3.select("#" + params.id)
      .append('svg')
      .datum(data)
      .transition().duration(500)
      .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
  });
};