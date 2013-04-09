// Code Based on https://github.com/yihui/knitr/blob/master/inst/opencpu/apps/index.html
// Modified by Ramnath Vaidyanathan
// TODO: Rewrite in Coffeescript and Refactor
function runCode(i){
  var btnEl = "#knitBtn" + i,
      formEl = "#knitForm" + i,
      codeEl = "knitCode" + i,
      resultEl = "#knitResult" + i;
  $(btnEl).click(function() {
    $(formEl).submit();
  });
  
  /* attach a submit handler to the form */
  $(formEl).submit(function(event) {

    /* stop form from submitting normally */
    event.preventDefault(); 
      
    /* get some values from elements on the page: */
    var $form = $( this ),
      textEl = 'textarea[name="' + codeEl + '"]'
      term = $form.find(textEl).val().replace(/\\/g, '\\\\').replace(/"/g, '\\"'),
      term2 = "```{r echo = F, message = F, warning = F, comment = NA}\n" + term + "\n```"
      url = $form.attr('action'),
      rcode = 'library(knitr)\n' +
        'knit2html(text = knit(text = "' + term2 + '"), fragment.only = TRUE)';
    /* Send the data using post and put the results in a div */
    $.post(url, { x: rcode }, function( data ) {
        $(resultEl).html(eval(data));
        $('pre code').each(function(i, e) {hljs.highlightBlock(e)});
      })
      .complete(function() {$(btnEl).attr('class', 'btn btn-primary');})
      .error(function() { alert("An error occurred!"); });
  });
};

function newAceEditor(editorEl, codeEl){
    var textEl = 'textarea[name="' + codeEl + '"]'    
    var editor = ace.edit(editorEl);
    var texteditor = $(textEl).hide();
    editor.setTheme("ace/theme/tomorrow");
    editor.setFontSize(16);
    editor.getSession().setMode("ace/mode/r");
    editor.getSession().setUseWrapMode(true);
    editor.getSession().setWrapLimitRange();
    editor.getSession().setTabSize(2);
    editor.getSession().setFoldStyle('markbegin');  
    editor.getSession().setFoldStyle('markbegin');
    editor.getSession().setValue(texteditor.val());
    editor.getSession().on('change', function(e){
      texteditor.val(editor.getSession().getValue());
      texteditor.change();
    });
    texteditor.onchange = function() {
        texteditor.select();
    };
    return(editor);
};

function runCode2(i){
  var btnEl = "#knitBtn" + i,
      formEl = "#knitForm" + i,
      textEl = "textarea.knitCode",
      resultEl = "#knitResult" + i;
  $(btnEl).click(function() {
    $(formEl).submit();
  });
  
  /* attach a submit handler to the form */
  $(formEl).submit(function(event) {

    /* stop form from submitting normally */
    event.preventDefault(); 
      
    /* get some values from elements on the page: */
    var $form = $( this ),
      term = $form.find(textEl).val().replace(/\\/g, '\\\\').replace(/"/g, '\\"'),
      term2 = "```{r echo = F, message = F, warning = F, comment = NA}\n" + term + "\n```"
      url = $form.attr('action'),
      rcode = 'library(knitr)\n' +
        'knit2html(text = "' + term2 + '", fragment.only = TRUE)',
      rcode2 = 'library(knitr)\n' +
        'knit2html(text = knit(text = "' + term2 + '"), fragment.only = TRUE)';
      
    /* Send the data using post and put the results in a div */
    $.post(url, { x: rcode },
      function( data ) {
          $(resultEl).html(eval(data));
          $('pre code').each(function(i, e) {hljs.highlightBlock(e)});
      })
      .error(function() { alert("An error occurred!"); });
    /*
      .complete(function() {$(btnEl).attr('class', 'btn btn-small');})
      
    */
  });
};

function newAceEditor2 (formNo){
    var textEl   = '#knitForm' + formNo + ' textarea.knitCode'    
    var editorEl = 'aceeditor' + formNo
    var editor = ace.edit(editorEl);
    var texteditor = $(textEl).hide();
    editor.setTheme("ace/theme/tomorrow");
    editor.setFontSize(15);
    editor.renderer.setShowGutter(false); 
    editor.getSession().setMode("ace/mode/r");
    editor.getSession().setUseWrapMode(true);
    editor.getSession().setWrapLimitRange();
    editor.getSession().setTabSize(2);
    editor.getSession().setFoldStyle('markbegin');  
    editor.getSession().setValue(texteditor.val());
    
    // FIXME: check if i need to fire on change
    // I think it would sufficient to modify the value of the texteditor
    // only when the code is run, which means I can stick this piece of
    // code inside runCode. It might be better.
    // Reference: Ace Editor Github Page.
    editor.getSession().on('change', function(e){
      texteditor.val(editor.getSession().getValue());
      texteditor.change();
    });
    
    texteditor.onchange = function() {
        texteditor.select();
    };
    
  editor.commands.addCommand({
    name: 'compileNotebook',
    bindKey: 'F4|Ctrl-Enter',
    exec: function(editor) {
      $('#knitForm' + formNo).submit();
    }  
  });
  return(editor);
};

function setupCell(i){
  runCode2(i);
  clearResult(i)
  return(newAceEditor2(i));
};

function clearResult(i){
  $("#clear" + i).click(function(e){
    e.preventDefault();
    $("#knitResult" + i).html("");
  });
}

function setupCells(){
  var ACECELLS = []  
  $('div.opencpu').each(function(i){
    var slide_i = $(this).find('a.knitBtn').attr('id').replace( /^\D+/g, '');
    ACECELLS[i] = setupCell(slide_i)
  });
};

function setupCellBehaviors(){
  // show hint modal
  $("div.opencpu a.hint").click(function(e){
    e.preventDefault();
    bootbox.alert($(this).attr('data-hint'))
    $('.bootbox').find('pre code').each(function(i, e) {hljs.highlightBlock(e)});
  })
  
  $("div.opencpu a.btn").tooltip({'placement': 'bottom'})
  
  // show check modal
  $(".knitTest").click(function(){
    bootbox.alert('Feature to check code is not implemented yet!')
  });
}

function runAllCells(){
  $('div.opencpu a.knitBtn').each(function(){
    $(this).click()
  })
};

function clearAllResults(){
  $('div.opencpu a.knitClear').each(function(){
    $(this).click();
  });
};

$(document).ready(function(){
  setupCells();
  setupCellBehaviors();
});
