<script>
/*
$(document).ready(function(){
  $('pre:has(code)').addClass('build');
  $('p:has(img)').addClass('build');
});
*/

$(document).ready(function(){
  $("#example").popover(); 
  $("[rel='tooltip']").tooltip(); 
  $('div.opencpu a.btn').tooltip();
  
  $('.quiz').find('li:has(em)').addClass('quiz-answer')
  $('li.quiz-answer em').replaceWith(function(){
    return $(this).contents()
  })
  $('.quiz').find('li').addClass('quiz-option')
  $.quiz();
  
  /* open hint modal when clicked
  $("div.opencpu a.hint").click(function(e){
    e.preventDefault();
    bootbox.alert($(this).attr('title'))
    $('.bootbox').find('pre code').each(function(i, e) {hljs.highlightBlock(e)});
  })
  */
  
  // show quiz answer as modal when clicked
  $(".quiz-show-answer").click(function(e){
    e.preventDefault();
    var val = $(this).siblings('div.quiz-explanation').html();
    bootbox.alert(val);
  }); 
  hljs.initHighlightingOnLoad();
  
  // show modal when check code is clicked
  /*
  $(".knitTest").click(function(){
    bootbox.alert('Feature to check code is not implemented yet!')
  });
  */
});
</script>


