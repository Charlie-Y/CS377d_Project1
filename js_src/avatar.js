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


*/

var STORAGE_STR = "storage";

var Avatar = can.Map.extend({}, {
	init: function(){

		this.attr('level', this.getLevel());

		this.name = "pusheen";

		this.animationTimeout = null;
		this.mainImg = undefined;

		// $ gifsicle -b pusheen_happy.gif --loopcount

		this.normalSrc = Util.extentionStr + "images/pusheen_normal.gif";
		this.partyImgBaseStr = Util.extentionStr + "images/pusheen_party";

		this.attr('currentSrc', this.normalSrc);

		this.numPartyImgs = 16;
		this.currentPartyImgNum = -1;

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

	// Move this stuff to the avatar_control
	onLevelChange: function(amount){
		console.log("Level changed: " + amount);

		if (amount > 0){

			clearTimeout(this.animationTimeout);
			
			this.toHappy();

			var _this = this;
			this.animationTimeout = setTimeout(function(){
				_this.toNormal();
			}, Util.getRandomInt(1300, 2000));

		}
	},

	toNormal: function(){
		this.attr("currentSrc", this.normalSrc);
	},	

	toHappy: function(){
		this.attr("currentSrc", this.getPartyImg());
	},

	getPartyImg: function(){
		
		var num = Util.getRandomInt(0, this.numPartyImgs - 1);

		if (num == this.currentPartyImgNum){
			num = (num + 1) % this.numPartyImgs;
		}

		this.currentPartyImgNum = num;
		return this.partyImgBaseStr + num.toString() + ".gif";
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
		var str = "Level: " + this.getLevel()
		console.log(str);
		// alert(str);
	}
});





// var foo = new Avatar(100);



module.exports = Avatar;