  $(document).ready(function(){
    
    // convert list items in quiz slides and initialize quiz
    $('.quiz').find('li:has(em)').addClass('quiz-answer')
    $('li.quiz-answer em').replaceWith(function(){
      return $(this).contents()
    })
    $('.quiz').find('li').addClass('quiz-option')
    $.quiz();
    
    // open hint modal when clicked
    $("div.opencpu a.hint").click(function(e){
      e.preventDefault();
      bootbox.alert($(this).attr('title'))
      $('.bootbox').find('pre code').each(function(i, e) {hljs.highlightBlock(e)});
    })
    
    // show quiz answer as modal when clicked
    $(".quiz-show-answer").click(function(e){
      e.preventDefault();
      var val = $(this).siblings('div.quiz-explanation').html();
      bootbox.alert(val);
    }); 
    
    // popover and tooltip initialization
    $("#example").popover(); 
    $("[rel='tooltip']").tooltip(); 
    
    // highlight code
    hljs.initHighlightingOnLoad();
    
    // initialize mathjax config
    MathJax.Hub.Config({
      tex2jax: {
        inlineMath: [['$','$'], ['\\(','\\)']],
        processEscapes: true
      }
    });
  });
  