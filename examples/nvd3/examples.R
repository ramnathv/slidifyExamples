# Example 1 (from geom_line)
# Summarise number of movie ratings by year of movie
mry <- do.call(rbind, by(movies, round(movies$rating), function(df) {
  nums <- tapply(df$length, df$year, length)
  data.frame(rating=round(df$rating[1]), year = as.numeric(names(nums)), number=as.vector(nums))
}))
drawChart('year', 'number', group = 'rating', type = 'lineChart', data = mry, destfile = 'tests/lineChart.html')

## Example 2 (Force Directed)

dat = read.csv('assets/data/patents.csv', header = TRUE)
drawChart(target ~ source | type, data = dat, type = 'forceDirectedChart', destfile = 'tests/forceDirected.html')


# Example 3 (Scatter Chart)
drawChart(mpg ~ wt | cyl, data = mtcars, type = 'scatterChart', destfile = 'tests/scatter.html')

# Example 4 (Bar Charts)
drawChart(~ cyl, data = mtcars, type = 'discreteBarChart', destfile = 'tests/bar1.html')
drawChart(~ cyl | gear, data = mtcars, type = 'multiBarChart', destfile = 'tests/bar2.html')
drawChart(~ cyl | gear, data = mtcars, type = 'multiBarHorizontalChart', destfile = 'tests/bar3.html')

require(countrycode)
dat = read.csv('http://projects.flowingdata.com/life-expectancy/life-expectancy-cleaned-all.csv')
datm = mutate(melt(dat, 1:2), 
  year = as.numeric(as.character(gsub("X", "", variable))),
  variable = NULL,
  region = countrycode(CountryCode, 'iso3c', 'continent')
)
drawChart(value ~ year | CountryCode, data = datm, type = 'lineChart', destfile = 'tests/exp.html')

x = 1:10
y = 1:10
dat = data.frame(x = x, y = y)

getChartParams(y ~ x, data = dat, type = 'Line')
dat = transform(economics, date = as.character(date))
drawChart('date', list('uempmed', 'psavert'), data = dat, type = 'Line', destfile = 'morris1.html', layout = 'morris.html')

