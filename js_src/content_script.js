
/*

Tracks something everytime you got a dance

Need to show a new Level!

needs to get harder over time
every 10 - every 20

+1 fade away thing

a nyan cat thing...
unlock animations as we go
being able to play games with it

 - drops a little food onto them
and they get bigger

- Progress bar..

Lasers the thing


Priority: 

+1 message
+1 many times for a sweep all

Some kind of progress bar on a mouseover


*/ 

var $ = require('jquery');
var Util = require('./util.js');
var Avatar = require('./avatar.js');
var InboxTracker = require('./inbox_tracker.js');

(function (){

	// TODO: get this from the content script

	// var extentionStr = "chrome-extension://ebdhakdfjbdppmnneefbggbdnmjinllp/";
	// Defined in script_injector.js
	// var extentionStr = $('#extension-holder').attr('data-extension-id');



	var avatar = new Avatar();

	var inboxTracker = new InboxTracker(avatar);


	// This is here in case there is an execution error
	console.log("content_script.js finish");

})();










