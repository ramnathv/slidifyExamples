<div class='row-fluid'>
<div class='span6'>
  <form action="http://public.opencpu.org/R/pub/base/identity/ascii" method="POST" id="knitForm{{slide.sno}}">
  {{{ slide.content }}}
    <div id='aceeditor{{slide.sno}}'></div>
    <div class='rEditor'>
      <a class="btn btn-primary runCode" id="runCode{{slide.sno}}">
        <i class="icon-play icon-white"></i> Run
      </a>
      <a class="btn btn-disabled testCode" id="testCode{{slide.sno}}">
        <i class="icon-check"></i> Check
      </a>
      <a class='btn btn-danger clearResult' id="clearResult{{slide.sno}}">
        <i class="icon-remove icon-white"></i> Clear
      </a>
      <a class='btn btn-success hint' href='#' title="{{slide.hint.html}}">
        <i class="icon-bookmark icon-white"></i> Hint
      </a>
    </div>
    <br/>
    {{# slide.task }}
    <div class='build'>
      <div class='alert alert-info'>
        {{{ slide.task.html }}}
      </div>
    </div>
    {{/ slide.task }}
  </form>
</div>
<div class='span6'>
  <div id="result{{slide.sno}}" class='wordwrap shiny-html-output'></div>
</div>
</div>
<script>
$(document).ready(function(){
  setupCell({{slide.sno}});
});
</script>

class rSession
  constructor: (@id) ->

rSession::setupCell: () =>
  runCode2()
  clearResult()
  newAceEditor()

rSession::clearResult: () ->
  i = @id
  $("#clear" + i).click (e) ->
    e.preventDefault()
    $("#knitResult" + i).html("")

rSession::setupAceEditor = (i, theme = "tomorrow") =>
  aceeditor  = ace.edit('aceeditor' + i)
  texteditor = $('#knitForm' + i + " textarea.knitCode").hide()
  aceeditor.setTheme("ace/theme/" + theme)
  aceeditor.setFontSize(15)
  aceeditor.renderer.setShowGutter(false)
  aceeditor.getSession().setMode("ace/mode/r")
  aceeditor.getSession().setUseWrapMode(true)
  aceeditor.getSession().setWrapLimitRange()
  aceeditor.getSession().setTabSize(2)
  aceeditor.getSession().setFoldStyle('markbegin')  
  aceeditor.getSession().setValue(texteditor.val())
  aceeditor.getSession().on 'change', (e) ->
    texteditor.val editor.getSession().getValue()
    texteditor.change()
    return false
  texteditor.onchange = () -> texteditor.select()
  return aceeditor



function setupCell(i) {
  runCode2(i);
  var myEditor = newAceEditor2(i);
  $("#clear" + i).click(function(e){
    e.preventDefault();
    $("#knitResult" + i).html("");
  });
  return(myEditor);
};

clearResult = (i) ->
  $("#clear" + i).click (e) ->
    e.preventDefault()
    $("#knitResult" + i).html("")


  
setupCells -> ()
  nCells = $('div.opencpu').length
  aceEditors = (setupCell(n) for n in nCells)
  





$("#clear{{slide.sno}}").click(function(e){
  e.preventDefault();
  $("#result{{slide.sno}}").html("");
  $("#run{{slide.sno}}").data('val', 0).click();
})  