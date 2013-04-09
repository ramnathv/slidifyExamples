# SciAnimator - Scientific Image Animator Plugin for jQuery #
[http://github.com/brentertz/scianimator](http://github.com/brentertz/scianimator)

Version: 1.4, Last updated: 1/18/2011

SciAnimator provides a simple yet powerful interface for animating a series of images.

## Features ##
* Easy customization - change labels, display only the controls you want or none at all, change control order
* Themeable via CSS - comes with 3 different themes, but you can also create your own
* Easily override default settings
* Multiple instances per page
* Keyboard controls
* Optional console debug output

## Demo ##

[http://brentertz.github.com/scianimator/](http://brentertz.github.com/scianimator/)

## Examples ##
These examples illustrate a few ways in which this plugin can be used.  

### Simplest possible creation: ###

Select the element which will hold the animator. (Perhaps a `<div id="scianimator"></div>` that you have already inserted into your page?) Pass an array of images in the options object.

	$('#scianimator').scianimator({  
		'images': ['images/foo.png', 'images/bar.png', 'images/bas.png', 'images/bat.png'],  
	});

### Create and start playing instantly: ###

	$('#scianimator').scianimator({  
		'images': ['images/foo.png', 'images/bar.png', 'images/bas.png', 'images/bat.png'],  
	}).scianimator('play');

### Create with additional options: ###

	$('#scianimator').scianimator({  
		'images': ['images/foo.png', 'images/bar.png', 'images/bas.png', 'images/bat.png'],  
		'width': 600,  
		'theme': 'dark',  
		'defaultFrame': 'last'
	});  

### Override a default value for ALL instances: ###

	$.fn.scianimator.defaults.debug = true; // turn on debug logging  
	$.fn.scianimator.defaults.theme = 'blue'; // change default theme  

	$.fn.scianimator.defaults.utf8 = 'false'; // Use text labels rather than UTF8 symbols  
	$.fn.scianimator.defaults.labels.text.play = 'Juego'; // l10n/i18n
	
	// then create your instances and they will use your custom defaults...

### Call a public method from your own script: ###

	$('#scianimator').scianimator('play');  
	$('#scianimator').scianimator('showStatus', {status:'Hello Ladies...', timeout:3000});  

## Settings/Options ##
What settings/options are available?

* <strong>autoRefresh</strong>: (default:false) - false to disable, otherwise milliseconds between auto refreshes
* <strong>debug:</strong> (default:false) - Write debug info to console?
* <strong>keyboard:</strong> (default:true) - Enable keyboard controls? All instances on page respond to keyboard events.  
	`<shift>+<left arrow> = first, <left arrow> = previous, <spacebar> or <enter/return> = play/stop, <right arrow> = next, <shift>+<right arrow> = last`
* <strong>images:</strong> (default: []) - Array of images to be used in animation
* <strong>controlContainer:</strong> (default: null) - Optional, container where should controls be placed. eg) $('#myDiv')  Defaults to selector element.
* <strong>controlPosition:</strong> (default: bottom) - Optional. top or bottom
* <strong>controls:</strong> (default: all) - Which controls should be displayed.  all, none or an array of any of the following ['first', 'previous', 'play', 'next', 'last', 'navigator', 'loop', 'speed'] - orderable. 		
* <strong>defaultFrame:</strong> (default: 0) - The default frame to display - number [0-9] or keywords 'first' or 'last'
* <strong>delay:</strong> (default: 250) - Controls animation speed - milliseconds between frames
* <strong>delayStep:</strong> (default: 50) - milliseconds - the step increment used when changing speed
* <strong>delayMin:</strong> (default: 25) - Minimum delay between frames - milliseconds
* <strong>delayMax:</strong> (default: 5000) - Maximum delay between frames - milliseconds
* <strong>dwellMultiplier:</strong> (default: 2) - Multiplier used to auto-calculate the length of the dwell (pause on first/last frames) ~N*delay
* <strong>width:</strong> (default: full width) - Width of container
* <strong>theme:</strong> (default: light) - Can be any of the predefined CSS themes - light (default), dark, blue - or use null or '' for base styles only
* <strong>utf8:</strong> (default: true), - Use UTF-8 labels where possible? eg) for symbols
* <strong>loopMode:</strong> (default: loop), - Loop mode - loop, sweep, or none		
* <strong>labels:</strong> (default: {see code}) - Labels used in UI controls.  Individual or all defaults may be overridden by passing in a replacement object with the same structure.  Note, only those properties being replaced are necessary.

For more details, check out the code - look for:
`$.fn.scianimator.defaults` in [http://github.com/brentertz/scianimator/assets/js/jquery.scianimator.js](jquery.scianimator.js).

## Support and Testing ##
Information about what version or versions of jQuery this plugin has been tested with, what browsers it has been tested in, etc.

### jQuery Versions ###
* 1.4.4
* 1.4.2

### Browsers Tested ###
If your desired browser/version is not listed, it does not necessarily mean that it does not work, but rather that it hasn't yet been tested.

* Internet Explorer 6-9
* Firefox 3-4 (FF2 needs a little CSS love, but functionally it appears ok)
* Chrome 6,8
* Safari 4,5
* iPhone - Mobile Safari

## Known Issues ##
* IE7 did not respond to `<ctrl>`+click to disable frames, but I was testing on a VM.  Can anyone verify this behavior?	

## TODO Items ##
Aside from resolving the KNOWN ISSUES, the following items are in consideration for future updates.  Feel free to recommend any of these or make additional suggestions.

* Increase font size and decrease padding for elements using UTF8 icons
* Support for `<br />` element or new line in controls list - better to revise controls CSS using floats
* Enable/disable controls as needed in UI - eg) max speed reached, disable +
* Instrument with more status messages - eg) The image for frame 10 failed to load.  Reloading images.
* Show failed images with alternate color
* Dwell multiplier controls
* Reload images from source button? (bypass cache)
* Ability to inject a new set if images, without needing to create a new instance.
* Expose other methods/settings for override?
* Refactor controls method into smaller pieces
* Use jQueryUI icons option

## Release History ##
* 0.9	- (12/19/2010) Initial checkin. This is a pre-release.  I want to complete a couple more of the TODO items before initial completion.
* 1.0	- (12/20/2010) Initial complete.
* 1.1	- (12/21/2010) Added autoRefresh support, which can reload images from source at regular intervals, bypassing the browser cache. By default, autoRefresh is disabled.
* 1.2	- (12/28/2010) Added keyboard control support. Decreased default delayStep. Updated IE conditional comment. Updated documentation.
* 1.3	- (1/3/2011) Resolves issue with IE8 Canvas - Simply needed CSS -> display:block for canvas element
* 1.4	- (1/18/2011) Refactored code to use plain img tags rather than the canvas element.  This removes the excanvas dependency and it now just works better in older browsers.  Also removed the height setting and made the width setting optional. If width is provided, it is now set on the primary container element, otherwise it will span the full available width.

## License ##
Copyright (c) 2010 Brent Ertz  
Released under the MIT license.   
[http://github.com/brentertz/scianimator](http://github.com/brentertz/scianimator)