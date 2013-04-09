---
title: D3.js Charts with Slidify
subtitle: Example
author: Ramnath Vaidyanathan
job: Assistant Professor, McGill
url:
  lib: ../../libraries
widgets: [nvd3]
--- 

<style>
body {
  background: #000;
}
</style>

## Scatterplot with d3.js

<div id="chart2" style='width:900px; height:500px; margin:auto auto;'>
  <svg></svg>
</div>

<script type='text/javascript'>
(function() {

  d3.json("assets/data/mtcars.json", function(data) {
    var data2;
    data2 = d3.nest().key(function(d) {
      return d.cyl;
    }).entries(data);
    return nv.addGraph(function() {
      var chart;
      chart = nv.models.scatterChart().x(function(d) {
        return d.wt;
      }).y(function(d) {
        return d.mpg;
      }).showDistX(true).showDistY(true).width(900).height(500);
      chart.xAxis.showMaxMin(true).tickFormat(d3.format(".02f"));
      d3.select("#chart2 svg").datum(data2).transition().duration(500).call(chart);
      return chart;
    });
  });

}).call(this);

</script>


---

## Gun Ownership vs. Homicides




<div id = 'chart3' style='margin: auto auto;'>
 <svg></svg>
</div>

<script>


</script>


*** =pnotes

```
d3.json "data/gundeaths.json", (data) ->
  data2 = d3.nest()
    .key( (d) -> d.continent )
    .entries(data)

  nv.addGraph ->
    chart = nv.models.scatterChart()
      .x( (d) -> d.Guns )
      .y( (d) -> d.Homicides )
      .color(d3.scale.category10().range())
      .showDistX(true)
      .showDistY(true)
      .showControls(true)
      .width(900)
      .height(500)
      .tooltipContent (key, x, y, e) ->
        e.point.Country

    chart.scatter.forceY([-5])
    chart.xAxis.axisLabel("Guns")
    chart.yAxis.axisLabel("Deaths")

    d3.select("#chart3 svg")
      .datum(data2)
      .transition().duration(500)
      .call(chart)

    return chart
```

---

## Checking R2NVD3

<div id= chart5 ></div>
 <script src= app3.js ></script>


---

## Another Check





