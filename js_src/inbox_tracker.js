var $ = require('jquery'); 
var Util = require('./util.js');

/*

inbox_tracker.js

Inbox tracker is responsible for catching click events
and passing them to the


*/


// THESE ARE CHANGING... UH OH

var BODY_SELECTOR = ".c1"; // oh man this changes
var MARK_DONE_SELECTOR = ".itemIconDone";
var MARK_UNDONE_SELECTOR = ".itemIconMarkedDone";
var SWEEP_SELECTOR= "button.ds"; //[title='Sweep (mark unpinned items as done)'] // OH MAN THIS CHANGES
var SWEEP_LIST_SELECTOR = ".DsPmj"; // OH 
var SWEEP_ITEM_SELECTOR = ".scroll-list-item";

var UNDO_SELECTOR = "span.fD";
var UNDO_PARENT_SELECTOR = ".IbRB2e";

var lastLevelIncrease = 0;


// Constructor 
function InboxTracker (avatar){

	this.avatar = avatar;

	this.init();

}

InboxTracker.prototype.init = function(){
	// Here is where everything is bound
	var _this = this;

	$(document).ready( function(){
		var intervalId = setTimeout(function(){
			_this.bindClickEvents();
			// console.log($._data($('.scroll-list-item').get(0), "events"));	
			_this.checkEventsBinded();
		}, 0);
	});

}



InboxTracker.prototype.bindClickEvents = function(){
	var _this = this;

	$(BODY_SELECTOR).on('click', MARK_DONE_SELECTOR, function(event){
		console.log("mark done clicked");
		// increaseLevel(1);
		// alertLevel();
		_this.avatar.increaseLevel(1);
		_this.avatar.alertLevel();	
	})

	// TODO: will also need to react to Confirm Sweepalls
	// TODO: also react to Bundled sweepalls, like PROMO sweepalls
	// TODO: there are quite a few sweepalls
	$(BODY_SELECTOR).on('click', SWEEP_SELECTOR, function(event){

		// figures out how many
		var button = event.target;
		var parent = $(button.closest(SWEEP_LIST_SELECTOR));
		var items = parent.find(SWEEP_ITEM_SELECTOR);

		// needs to check if the sweep many appears
		// there needs to be some way to figure out how many are swept away
		// probably set up some kind of delay before checking...
		console.log("sweep all clicked, " + items.size() + " items cleared");
		_this.avatar.increaseLevel(items.size());
		_this.avatar.alertLevel();
	})


	$(BODY_SELECTOR).on('click', MARK_UNDONE_SELECTOR, function(event){
		console.log("mark undone clicked");

		// undoLevelChange();
		_this.avatar.decreaseLevel(1);
		_this.avatar.alertLevel();
	})

	$(UNDO_PARENT_SELECTOR).on('click', UNDO_SELECTOR, function(event){
		console.log("undo clicked");

		_this.avatar.undoLevelChange();
		_this.avatar.alertLevel();
	})

	// console.log('bindClickEvents done');

}

InboxTracker.prototype.checkEventsBinded = function(){
	console.log("checkEventsBinded start");
	if ($._data($(BODY_SELECTOR).get(0), "events") == undefined){
	// if ($._data($('.scroll-list-item').get(0), "events") == undefined){
		console.log("bind failed");
		return false;
	} else {
		console.log("bind successful");
		return true;
	}
	console.log("checkEventsBinded done");
}

module.exports = InboxTracker;
