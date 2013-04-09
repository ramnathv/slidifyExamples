// CREATE TYPEWRITER EFFECT 
(function($) {      
    $.fn.typewriter = function() {
        this.each(function() {
            var $ele = $(this), str = $ele.text(), progress = 0;
            $ele.text('');
            timer = setInterval(function() {
              if(pause===false){ // ADD THIS LINE
                  $ele.text(str.substring(0, progress++) + (progress & 1 ? '_' : ''));
                  if (progress >= str.length) clearInterval(timer);
                } // ADD THIS LINE
            }, 100);
            
        });
        this.each(function(i, e) {hljs.highlightBlock(e)});
        return this;
    };   
})(jQuery);

// AND ADD THIS LINES :
var pause = false;
$('#play_pause').click(function(){
  pause= !pause ? true : false;
});
