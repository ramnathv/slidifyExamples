var slidemote = (function(){
  var url = "http://slidemote.jit.su/",
		id = getId(); 

	loadScript(url+"socket.io/socket.io.js", function(){
		init();
	})

	//Get user ID
	function getId(){
		var scripts = document.getElementsByTagName('script');

		for (i = scripts.length; i--;) {
			if(/slidemote.js/.test(scripts[i].src)){
				return scripts[i].src.split('#')[1];
			}
		}
	}

	function loadScript(src, callback){
		var s, r, x;
		r = false;
		s = document.createElement('script');
		s.type = 'text/javascript';
		s.src = src;
		s.onload = s.onreadystatechange = function() {
		//console.log( this.readyState ); //uncomment this line to see which ready states are called.
		if ( !r && (!this.readyState || this.readyState == 'complete') )
		{
		  r = true;
		  callback();
		}
		};
		x = document.getElementsByTagName('head')[0]; 
		x.appendChild(s); 
		//document.body.appendChild(s);
	}

	function init (data) {

		var socket = io.connect('http://slidemote.jit.su/');

		//$(function(){
			var slideType = '';

			socket.emit('auth', id);

			if(window.Reveal){
				slideType = 'reveal'
			}else if(window.impress){
				slideType = 'impress';
			}else if(window.$ && window.$.deck){
				slideType = 'deckjs';
			}else if(window.Flowtime){
				slideType = 'flowtime';
			}

			socket.on('slideType', function (data) {
				socket.emit('type', slideType);
			})
			

			socket.on('event', function (data) {
				//Reveal js
				if(slideType === 'reveal'){
					Reveal[data.code]();
				}//end

				//Impress
				if(slideType === 'impress'){
					var arg = '';
					if(/goto/.test(data.code)){	

						arg = parseInt(data.code,10);
						data.code = "goto";
					}

					impress()[data.code](arg);
				}//end

				//Deckjs
				if(slideType === 'deckjs'){
					var arg = '';
					if(/goto/.test(data.code)){	

						arg = parseInt(data.code,10);
						data.code = "go";
					}

					$.deck(data.code, arg)
				}//end

				//Flowtime
				if(slideType === 'flowtime'){
					var arg = '', page='';

					if(/\dgoto/.test(data.code)){	

						page = parseInt(data.code.split(',')[0]);

						arg = parseInt(data.code.split(',')[1],10);

						data.code = "gotoPage";
					}

					Flowtime[data.code](page,arg);
				}//end


				
			})
		//});
	}



}())
