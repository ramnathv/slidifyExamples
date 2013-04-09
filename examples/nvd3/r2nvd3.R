df2nvd3 <- function(df, key = NULL){
  list2keyval <- function(l){
    keys = names(l)
    lapply(keys, function(key){
      list(key = key, values = l[[key]])
    })
  }
  
  df2list <- function(df){
    l = plyr::alply(df, 1, as.list)
    names(l) = NULL
    return(l)
  }
  
  df2keyval <- function(df, key){
    if (is.null(key)){
      df2list(df)
    } else {
      list2keyval(plyr::dlply(df, key, df2list))
    }
  }
 rjson::toJSON(df2keyval(df, key))
}

fixParams <- function(params_){
  require(plyr)
  if (length(params_$y) == 0 || params_$y == "" || is.null(params_$y)){
    .variables = c(params_$x, params_$group)
    params_$data = count(params_$data, .variables[.variables != ""])
    params_$y = 'freq'
  }
  return(params_)
}

guessGeom <- function(params_){
  classes = sapply(params_$data, class)
  class_x = classes[params_$x]  
}


getChartParams <- function (x, ...) {
  UseMethod("getChartParams")
}

getChartParams.default <- function(x, y = NULL, group, type, data, id = 'chart', lib = F){
  require(whisker)
  params_ = fixParams(as.list(environment()))
  params = rjson::toJSON(filter_blank(params_[!(names(params_) %in% c('data', 'lib'))]))
  data = df2nvd3(params_$data)
  list(params = params, data = data, drawChart = getChartFunction(params_$type))
}

getChartParams.character <- getChartParams.default

# getChartParams.list <- function(x, )

getChartParams.formula <- function(x, type, data, id = 'chart'){
  tmp = lattice::latticeParseFormula(x, data = data)
  params = list(x = tmp$right.name, y = tmp$left.name, group = names(tmp$condition),
    type = type, id = id, data = data)
  do.call('getChartParams', params)
}

getChartFunction <- function(type){
  switch(type, 'forceDirectedChart' = 'forceDirectedChart', 'drawChart')
}

renderChart <- function(chart, fragment_only, destfile, layout){
  require(whisker)
  template = read_file(ifelse(fragment_only, 'chart.html', layout))
  html = capture.output(cat(whisker.render(template, chart)))
  if (!is.null(destfile)){
    writeLines(html, con = destfile)
    return(destfile)
  } else {
    return(html)
  }
}

drawChart <- function(..., fragment_only = FALSE, destfile = NULL, layout = 'nvd3.html'){
  chart = getChartParams(...)
  renderChart(chart, fragment_only, destfile, layout)
}


publishChart <- function(html_file){
  td <- tempdir()
  file.copy(html_file, td)
  file.rename(file.path(td, html_file), 'index.html')
  cmd <- sprintf('gist %s', file.path(td, 'index.html'))
  system(cmd)
}

read_file <- function (doc, ...){
  paste(readLines(doc, ...), collapse = "\n")
}

setDefaultParams <- function(x, ...){
  UseMethod('setDefaultParams')
}

setDefaultParams.multiBarChart <- function(){
  list()
}

filter_blank <- function (x) {
  Filter(function(y) all(y != ""), x)
}

