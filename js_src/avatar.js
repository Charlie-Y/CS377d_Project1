var $ = require('jquery'); 
window.jQuery = $;
var Util = require('./util.js');
// I think can gets defined on the global namespace, so this is just a formality to make sure it is loaded first
var _can = require('./can.jquery.js');
var AvatarControl = require("./avatar_control.js");



/*

Avatar.js


The avatar is responsible for tracking the things, rendering the things, and responding to 
the inbox tracker.




Lets figure out how this whole thing will work 

-Every time you mark done you get +1 XP
-7 XP will let you level up


on level up you gain a new "play" or a new "food"

types of reactions: 

normal
food
dance/play

excited - on mouseover

stories - 3 part things


-- interaction
when you click on the buddy, the menu icons appear
showing food/play/? buttons


*/

var STORAGE_STR = "storage";



var Avatar = can.Map.extend({}, {
	init: function(){

		this.attr('level', this.getLevel());

		this.name = "pusheen";

		this.animationTimeout = null;
		this.mainImg = undefined;

		// Resets an edited gif to have infinite loop
		// $ gifsicle -b pusheen_happy.gif --loopcount

		// resizes a 350x300 to 300x300 gif
		// $ gifsicle --crop 25,0-325,300 --output pusheen_excited3.gif pusheen_excited2.gif


		this.normalSrc = Util.extentionStr + "images/pusheen_normal0.gif";
		this.excitedBaseStr = Util.extentionStr + "images/pusheen_excited";

		this.foodBaseStr = Util.extentionStr + "images/pusheen_food_";
		//TODO: unlock these by level
		this.foodStrs = "alot cheetos cookie everything fastfood fish peeps picnic pizza ramen rose snowman sushi treat turkey".split(" ");

		this.playBaseStr = Util.extentionStr + "images/pusheen_play_";
		this.playStrs = "adventuretime art baker breadcat burrito catniss cloudsleep cookiesearch dance doodle fancy fat fishing gangnam ghost leaf link magic magic2 nutella nyan party people perry pie potter r2d2 sailormew sandman showers sombrero sunglasses tumblr".split(" ")

		this.attr('currentSrc', this.normalSrc);
		this.attr('isBusy', false);

		this.numPartyImgs = 9;
		this.currentPartyImgNum = -1;

		this.animationTimeout = -1;

		this.render();
		
	},

	render: function(){
		this.div = $("<div id='avatar-wrap'>");
		$('body').append(this.div);

		// // Do can.js things with this
		// Avatar.prototype.render = function(){
		// 	var div = $("<div id='avatar-wrap'>");
		// 	var img = $("<img class='avatar-img' id='avatar-1'>");

		this.control = new AvatarControl( this.div, {avatar: this});
		// 	img.attr('src', this.normalSrc);
		// 	img.attr('loop', true);

		// 	div.append(img);

		// 	$('body').append(div);

		// 	this.mainImg = img;
		// }
	},

	levelUp: function(){
		this.level++;
	},

	// Moved this stuff to the avatar_control
	onLevelChange: function(amount){
		// This should track internal changes.
		// the control is in charge of view changes
	},

	toNormal: function(){
		this.attr("currentSrc", this.normalSrc);
		this.attr('isBusy', false);
	},	

	toEating: function(){
		// var newSrc = ;
		var randomStr = this.foodStrs[ Util.getRandomInt(0,this.foodStrs.length-1)];
		var newSrc = this.foodBaseStr + randomStr + ".gif";

		this.attr('currentSrc', newSrc);
		this.attr('isBusy', true);
	},

	toPlaying: function(){
		var randomStr = this.playStrs[ Util.getRandomInt(0,this.playStrs.length-1)];
		var newSrc = this.playBaseStr + randomStr + ".gif";
		this.attr('currentSrc', newSrc);
		this.attr('isBusy', true);
	},

	toExcited: function(){
		this.attr("currentSrc", this.getExcitedImg());
		this.attr('isBusy', true);
	},

	getExcitedImg: function(){
		
		var num = Util.getRandomInt(0, this.numPartyImgs - 1);

		if (num == this.currentPartyImgNum){
			num = (num + 1) % this.numPartyImgs;
		}

		this.currentPartyImgNum = num;
		// return this.partyImgBaseStr + "8.gif";
		return this.excitedBaseStr + num.toString() + ".gif";
	},


	// plays the animation
	/*
	
		options{
			type: play, food, excited
			duration: something
			interruptable: TODO
		}

	*/
	playAnimation: function(options){
		clearTimeout(this.animationTimeout);

		if (options == undefined){
			console.error("playAnimation needs a properly formatted argument");
		}
			
		switch(options.type){
			case 'play':
				this.toPlaying();
				break;
			case 'food':
				this.toEating();
				break;
			case 'excited':
				this.toExcited();
				break;
			default:
				return;
		}

		var _this = this;
		this.animationTimeout = setTimeout(function(){
			_this.toNormal();
		}, Util.getRandomInt(options.duration - 400, options.duration + 400));
	},

	checkLevel: function(){
		var level = localStorage.getItem(STORAGE_STR);
		if (level == null){
			localStorage.setItem(STORAGE_STR, 0);
		}
	},

	getLevel: function(){
		this.checkLevel();

		return localStorage.getItem(STORAGE_STR);
	},

	changeLevel: function(val){
		this.checkLevel();

		var level = parseInt(localStorage.getItem(STORAGE_STR));
		level += val;
		lastLevelIncrease = val;


		this.attr('level', level);
		// Here is where we pass it on
		this.onLevelChange(val);

		localStorage.setItem(STORAGE_STR, level);
	},

	increaseLevel: function(amount){
		var amt = amount == undefined ? 1 : amount;

		this.checkLevel();
		this.changeLevel(amt);
	},

	decreaseLevel: function(amount){
		var amt = amount == undefined ? 1 : amount;

		this.checkLevel();
		this.changeLevel( -amt );
	},


	undoLevelChange: function(){
		this.checkLevel();
		this.changeLevel( -lastLevelIncrease );
	},

	alertLevel: function(){
		// not using this anymore
		return;

		var str = "Level: " + this.getLevel()
		console.log(str);
		// alert(str);
	}
});





// var foo = new Avatar(100);



module.exports = Avatar;