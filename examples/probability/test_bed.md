---
title: Test Bed
subtitle: Features
author: Ramnath Vaidyanathan
job: Assistant Professor, McGill 
license: by-nc-sa
hitheme: solarized_dark
github:
  user: ramnathv
  repo: slidio
--- .segue .nobackground .dark

## Test Bed




--- &multitext

## Question 1




A normally distributed population has a mean of $\mu = 100$ and a standard deviation of $\sigma = 20$. Suppose we select a sample of size 4.

1. What is the mean of the sampling distribution?
2. What is the standard error of the sampling distribution?
3. What is the probability that our selected sample has a mean greater than 110?

*** .explanation

1. <span class="answer">100</span>
2. <span class="answer">10</span>
3. The sampling distribution of the sample mean, for samples of size 4 will be normal with mean 100 and standard deviation $\frac{20}{\sqrt{4}}$. Hence, the probability of selecting a sample with mean greater than 110 is given by
$$
\begin{aligned}
P(X > 110) & = P\left(Z > \frac{110 - 100}{\sqrt{4}}\right) \\
             & = P\left(Z > 1\right) 
\end{aligned}
$$ 
Either using the standard normal table, or by using the 68-95-99.7 rule, we can compute this probability to be <span class="answer">0.1587</span>

--- &radio2

## Correlation





Suppose the average number of Karma points per post is 13.8 and the standard deviation is 4.8. What proportion of students would have more than 20 points per post?

1. _0.0982_
2. 0.9018
3. 0.0491
4. 0.1965

*** =image

<img src=http://www.clipular.com/c?2852143=J0T6IdNSBQiwafHVE_6_lMuJ_ME>

*** .explanation


--- &radio2

## Correlation





Suppose the average number of Karma points per post is 13.8 and the standard deviation is 4.8. What proportion of students would have more than between 10 and 16 points per post?

1. _0.0982_
2. 0.9018
3. 0.0491
4. 0.1965

*** =image

<img src=http://www.clipular.com/c?2852143=J0T6IdNSBQiwafHVE_6_lMuJ_ME>

*** .explanation


--- &multitext

## Quartiles of Normal Distribution

The median of any normal distribution equals its mean. 

1. What is the area under the standard normal curve to the left of the first quartile?
2. Use the value found in (1) to determine the first quartile for a standard normal distribution?
3. 

--- &radio .inline

## Q3

If the life of wild pheasants follows a normal distribution with a mean of 9 months and a variance of 9, what percent of the population will be less than 11 months of age?





1. 34.13                 
2. _74.86_
3. 84.13             
4. 62.93

*** .explanation

We are looking for the area to the left of x = 11

<img src="assets/fig/unnamed-chunk-5.png" title="plot of chunk unnamed-chunk-5" alt="plot of chunk unnamed-chunk-5" class=center />


--- &radio

## Question 4

The distribution of lifetimes for a certain type of light bulb is normally distributed with a mean of 1000 hours and a standard deviation of 100 hours.  Find the 33rd percentile of
the distribution of lifetimes.





1. 560
2. 330
3. 1044
4. 1440
5. _none of these_

*** .explanation

We are interested in finding the 33rd percentile. Computing the z-score corresponding to p = 0.33, we get z = -0.4399. We can find the required percentile by "unstandardizing" the z-score . Hence, we get x = 1000 + 100 * -0.4399, which gives us x = 956.0087.

--- &radio2

## Question 5

Are the heights of each bar a relative frequency?

1. Yes
2. No

*** .hint

1. This is hint 1.
2. This is hint 2.

*** =image

<img class='vcenter' src='http://www.comscoredatamine.com/wp-content/uploads/2012/02/facebookgrowthregions_dec11.png'>

--- &multitext .small

## Heights

The distribution of heights of a population of adults is approximately normal with mean 66 inches and SD 2.5 inches. [For those of you who are used to the metric system: one foot is 12 inches.]

1. Approximately what percent of the adults are over 6 feet tall?
2. Approximately what percent of the adults have heights that are within 1 inch of the average?
3. Approximately what percent of the adults are 70 inches tall, to the nearest inch?
4. Approximately what is the 90th percentile of the heights, in inches?

*** .explanation

1. The percent of adults over 6 feet tall is given by
   
    
    ```r
    pnorm(6, mean = 66/12, sd = 2.5, lower.tail = F)
    ```
    
    ```
    ## [1] 0.4207
    ```


--- &draggable

## Normal Distribution





<img src="assets/fig/unnamed-chunk-9.svg" title="plot of chunk unnamed-chunk-9" alt="plot of chunk unnamed-chunk-9" class=center />


*** #draggable1

__Direction__: What is the direction of the relationship?

*** #draggable2 .top

__Form__: Is the overall relationship a line, a quadratic curve ...?


*** #draggable3

__Strength__: Is there significant variation in values around the best fitting curve?


---

## Guess the Correlation

<img src="assets/fig/unnamed-chunk-10.svg" title="plot of chunk unnamed-chunk-10" alt="plot of chunk unnamed-chunk-10" class=center />


<div id='draggable4' class="draggable ui-widget-content build">
  <p class='triangle-border'>
  $$r = \sum \frac{z_x \times z_y}{n - 1}$$
  </p>
</div>

---

## Highway Signs

<style>
.table-half {
  width: 50%;
  margin: auto auto;
}
</style>

A Pennsylvania research firm conducted a study in which 30 drivers (of ages 18 to 82 years old) were sampled, and for each one, the maximum distance (in feet) at which he/she could read a newly designed sign was determined. The goal of this study was to explore the relationship between a driver's age and the maximum distance at which signs were legible, and then use the study's findings to improve safety for older drivers. (Reference: Utts and Heckard, Mind on Statistics (2002). Originally source: Data collected by Last Resource, Inc, Bellfonte, PA.)

<!-- html table generated in R 2.15.2 by xtable 1.7-1 package -->
<!-- Tue Mar 26 17:06:34 2013 -->
<TABLE class=table-half>
<TR> <TH>  </TH> <TH> Age </TH> <TH> Distance </TH>  </TR>
  <TR> <TD align="right"> 1 </TD> <TD align="right">  18 </TD> <TD align="right"> 510 </TD> </TR>
  <TR> <TD align="right"> 2 </TD> <TD align="right">  20 </TD> <TD align="right"> 590 </TD> </TR>
  <TR> <TD align="right"> 3 </TD> <TD align="right">  22 </TD> <TD align="right"> 560 </TD> </TR>
  <TR> <TD align="right"> 4 </TD> <TD align="right">  23 </TD> <TD align="right"> 510 </TD> </TR>
  <TR> <TD align="right"> 5 </TD> <TD align="right">  23 </TD> <TD align="right"> 460 </TD> </TR>
  <TR> <TD align="right"> 6 </TD> <TD align="right">  25 </TD> <TD align="right"> 490 </TD> </TR>
   </TABLE>


--- &opencpusmall

## Execute Code




We can create a scatterplot using the `xyplot` function in the `lattice` package. Click the <i icon-run></i> button to run the code.


<div><textarea class='knitCode' style='display:none;'>
require(lattice)
xyplot(mpg ~ wt, data = mtcars, pch = 16)

</textarea></div>


<p class='build'>
From the scatterplot, we observe a strong, negative, linear relationship between the variables.
</p>

--- &opencpusmall

## Execute More Code

Checking to see if this works for more cells


$\alpha = \beta + \gamma$

<div><textarea class='knitCode' style='display:none;'>
require(ggplot2)
qplot(wt, mpg, data = mtcars)

</textarea></div>


*** =hint

This is an explanation


```r
require(ggplot2)
qplot(wt, mpg, data = mtcars)
```


$\alpha = \beta + \gamma$

---

<script src="http://code.jquery.com/ui/1.10.1/jquery-ui.js"></script>

<script>
$(function() {
  $( ".draggable" ).draggable();
});
</script>

<script>
$('.pagination li a').live('click', function(){
  var i = $(this).data('slide');
  window.slidedeck.gotoSlide(i+1);
});
</script>

