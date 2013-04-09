NVD3 <- setRefClass('NVD3', fields = list(params = 'list'), methods = list(
  initialize = function(){
    params <<- list();
    params$chart <<- list();
    params$xAxis <<- list();
  },
  addParams = function(...){
    params <<- modifyList(params, list(...))
  },
  chart = function(...){
    params$chart <<- modifyList(params$chart, list(...))
  },
  xAxis = function(..., replace = F){
    if (replace) {
      params$xAxis <<- list(...)
    } else {
      params$xAxis <<- modifyList(params$xAxis, list(...))
    }
  },
  getChartParams = function(x, data, ...){
    fml = lattice::latticeParseFormula(x, data = data)
    params <<- modifyList(params, list(x = fml$right.name, y = fml$left.name, 
      group = names(fml$condition), data = data, ...))
  },
  fixChartParams = function(){
    require(plyr)
    if (length(params$y) == 0){
      variables = c(params$x, params$group)
      params$data <<- count(params$data, variables[variables != ""])
      params$y <<- 'freq'
    }
    return(params)
  },
  render = function(destfile = 'index.html'){
    require(whisker)
    template = paste(readLines('nvd3_3.html', warn = F), collapse = '\n')
    myparams = r2json(params[!(names(params) %in% c('data', 'chart', 'xAxis'))])
    data = r2json(params$data)
    xAxis = paste(c('chart.xAxis', chainConfig(params$xAxis)), collapse = '\n')
    chart = paste(c('chart', chainConfig(params$chart)), collapse = '\n')
    html = capture.output(cat(whisker.render(template)))
    # writeLines(html, con = destfile)
  },
  show = function(){
    tf <- tempfile(fileext = 'html');
    writeLines(.self$render(), tf)
    system(sprintf("open %s", tf))
  }
))

getChartParams = function(x, data, ...){
  fml = lattice::latticeParseFormula(x, data = data)
  list(x = fml$right.name, y = fml$left.name, 
   group = names(fml$condition), data = data, ...)
}

nvd3Plot <- function(x, data, width = 900, height = 500, ...){
  myChart <- NVD3$new()
  myChart$getChartParams(x, data, ...)
  myChart$fixChartParams()
  return(myChart$copy())
}

chainConfig <- function(...){
  require(rjson)
  dotlist = list(...)
  obj = names(dotlist)
  params = dotlist[[1]]
  config <- sapply(names(params), USE.NAMES = F, function(param){
    sprintf('  .%s( %s )', param, toJSON(params[[param]]))
  })
  paste(c(obj, config), collapse = "\n")
}

## Example 1
p1 <- nvd3Plot(mpg ~ wt | cyl, data = mtcars, shape = 'gear', id = 'chart', type = 'scatterChart')
p1$xAxis(axisLabel = 'Weight')
p1

## Example 2
p2 <- nvd3Plot(~ cyl | gear, data = mtcars, id = 'chart', type = 'multiBarHorizontalChart')
p2$chart(showControls = F)
p2

## Example 3
p3 <- nvd3Plot(~ cyl, data = mtcars, id = 'chart', type = 'pieChart')
p3

p3$chart(donut = TRUE)
p3

## Example 4
p4 <- nvd3Plot(uempmed ~ date, data = economics, id = 'chart', type = 'lineChart')
p4

ecm <- reshape2::melt(economics[,c('date', 'uempmed', 'psavert')], id = 'date')
p5 <- nvd3Plot(value ~ date | variable, data = ecm, id = 'chart', type = 'lineChart')
p5

## Example 5 (multiBarChart)
hair_eye = as.data.frame(HairEyeColor)
p6 <- nvd3Plot(Freq ~ Hair | Eye, data = subset(hair_eye, Sex == "Female"), id = 'chart', type = 'multiBarChart')
p6$chart(color = c('brown', 'blue', '#594c26', 'green'))
p6

## Example 6 (stackedAreaChart)
dat <- data.frame(t=rep(0:23,each=4),var=rep(LETTERS[1:4],4),val=round(runif(4*24,0,50)))
p7 <- nvd3Plot(val ~ t | var, data = dat, type = 'stackedAreaChart', id = 'chart')



r2json <- function(x, ...){
  UseMethod("r2json")
}

r2json.default <- rjson::toJSON

r2json.data.frame <- function(df, key = NULL){
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

fixParams <- function(params_){
  require(plyr)
  if (length(params_$y) == 0 || params_$y == "" || is.null(params_$y)){
    .variables = c(params_$x, params_$group)
    params_$data = count(params_$data, .variables[.variables != ""])
    params_$y = 'freq'
  }
  return(params_)
}


getChartParams.formula <- function(x, type, data, id = 'chart'){
  tmp = lattice::latticeParseFormula(x, data = data)
  params = list(x = tmp$right.name, y = tmp$left.name, group = names(tmp$condition),
                type = type, id = id, data = data)
  do.call('getChartParams', params)
}

getChartParams.default <- function(x, y = NULL, group, type, data, id = 'chart', lib = F){
  require(whisker)
  params_ = fixParams(as.list(environment()))
  params = rjson::toJSON(filter_blank(params_[!(names(params_) %in% c('data', 'lib'))]))
  data = df2nvd3(params_$data)
  list(params = params, data = data, drawChart = getChartFunction(params_$type))
}
