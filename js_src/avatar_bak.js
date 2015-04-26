var $ = require('jquery'); 
window.jQuery = $;


var Util = require('./util.js');
// I think can gets defined on the global namespace, so this is just a formality to make sure it is loaded first
var _can = require('./can.jquery.js');
// var _can = require('./can.jquery.min.js');

var extentionStr = chrome.extension.getURL('');




/*

Avatar.js


The avatar is responsible for tracking the things, rendering the things, and responding to 
the inbox tracker.


*/

var STORAGE_STR = "storage";



function Avatar(level){
	this.level = level;
	this.name = "pusheen";

	this.animationTimeout = null;
	this.mainImg = undefined;

	// $ gifsicle -b pusheen_happy.gif --loopcount

	this.normalSrc = extentionStr + "images/pusheen_normal.gif";

	this.partyImgBaseStr = extentionStr + "images/pusheen_party";
	this.numPartyImgs = 16;
	this.currentPartyImgNum = -1;

	this.render();



}

// Do can.js things with this
Avatar.prototype.render = function(){
	var div = $("<div id='avatar-wrap'>");
	var img = $("<img class='avatar-img' id='avatar-1'>");


	img.attr('src', this.normalSrc);
	img.attr('loop', true);

	div.append(img);

	$('body').append(div);

	this.mainImg = img;
}


Avatar.prototype.onLevelChange = function(amount){
	console.log("Level changed: " + amount);

	if (amount > 0){

		clearTimeout(this.animationTimeout);
		
		this.toHappy();

		var _this = this;
		this.animationTimeout = setTimeout(function(){
			_this.toNormal();
		}, Util.getRandomInt(1300, 2000));

	}
}

Avatar.prototype.toNormal = function(){
	this.mainImg.attr("src", this.normalSrc);
}

Avatar.prototype.toHappy = function(){
	this.mainImg.attr("src", this.getPartyImg());
}


Avatar.prototype.getPartyImg = function(){
	
	var num = Util.getRandomInt(0, this.numPartyImgs - 1);

	if (num == this.currentPartyImgNum){
		num = (num + 1) % this.numPartyImgs;
	}

	this.currentPartyImgNum = num;

	return this.partyImgBaseStr + num.toString() + ".gif";
}

Avatar.prototype.checkLevel = function(){
	var level = localStorage.getItem(STORAGE_STR);
	if (level == null){
		localStorage.setItem(STORAGE_STR, 0);
	}
}

Avatar.prototype.getLevel = function(){
	this.checkLevel();

	return localStorage.getItem(STORAGE_STR);
}

Avatar.prototype.changeLevel = function(val){
	this.checkLevel();

	var level = parseInt(localStorage.getItem(STORAGE_STR));
	level += val;
	lastLevelIncrease = val;

	// Here is where we pass it on
	this.onLevelChange(val);

	localStorage.setItem(STORAGE_STR, level);
}

Avatar.prototype.increaseLevel = function(amount){
	var amt = amount == undefined ? 1 : amount;

	this.checkLevel();
	this.changeLevel(amt);
}

Avatar.prototype.decreaseLevel = function(amount){
	var amt = amount == undefined ? 1 : amount;

	this.checkLevel();
	this.changeLevel( -amt );
}


Avatar.prototype.undoLevelChange = function(){
	this.checkLevel();
	this.changeLevel( -lastLevelIncrease );
}

Avatar.prototype.alertLevel = function(){
	var str = "Level: " + this.getLevel()
	console.log(str);
	// alert(str);
}


var Avatar2 = can.Construct.extend({}, {
	init: function(level){
		this.level = level;


		this.div = $("<div id='avatar-wrap2'>");
		$('body').append(this.div);
	},


	levelUp: function(){
		this.level++;
	}
});

var AvatarControl = can.Control({
	init: function(el, options){
		this.element.html(can.view( extentionStr + 'mustache/main.mustache'));
	}
});


var foo = new Avatar2(100);
var fooControl = new AvatarControl(foo.div);








// module.exports = Avatar;