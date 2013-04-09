$(document).ready(function(){
  //$("pre:has(code)").addClass('build');
  //$("div:has(img)").addClass('build')
  mytimings = [{"slide":1,"time":1364157100555},{"time":15175,"slide":2,"action":"gotoSlide"},{"time":66973,"slide":3,"action":"gotoSlide"},{"time":103175,"slide":4,"action":"gotoSlide"},{"time":146846,"slide":5,"action":"gotoSlide"}, {"time":169000,"slide":5,"action":"pause"}];
  syncSlides(mytimings, pop);
  syncSlides2Video(mytimings, pop)
});
