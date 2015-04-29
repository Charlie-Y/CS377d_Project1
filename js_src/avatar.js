var $ = require('jquery'); 
var Util = require('./util.js');
// I think can gets defined on the global namespace, so this is just a formality to make sure it is loaded first
var _can = require('./can.jquery.js');
var AvatarControl = require("./avatar_control.js");
var CostumeData = require("./costume_data.js");

/*

TODO: show a little bar that gets bigger with each +1
TODO: show a level up message with a slightly nicer animation
TODO: allow changing default costumes


*/

/*

Avatar.js


The avatar is responsible for tracking the things, rendering the things, and responding to 
the inbox tracker.




Lets figure out how this whole thing will work 

-Every time you mark done you get +1 XP
-7 XP will let you level up

/////////////////
/////////////////

LEVELING UP

-- unlocks costumes
you can change your default pushene costume. 
that will change the default animation
and that will change the type of dance animations
and what will happen once you click on the pusheen

-- unlocks new foods
this will just allow pusheen to eat different foods

i think it is fine what we have now. just food and costumes are enough
and there should just be a giant repository of "other" things that
can happen at any time

Ideally - 
each costume would have many celebration animations
each costume should have several eating animations


For now -

costumes just unlock default animations
and add a new 'dance' animation if I can find one

Clicking pusheen will make pusheen dance with a costume related animation
or perhaps cycle the current animation

move the action buttons to a menu button

food doesn't level up

how random shoud the pusheen dances be? 
thre are clearly some celebrating animations

and I want the costume thing to exist, becuaes it is cute
soooooooooooooo

perhaps you unlock animations? 
like, EVERY SINGLE ANIMATION

but it is very very cute to have a unicorn pusheen that you can cycle through. 

some animations ar enot worthy of costuming... but maybe they are all worhty 
of costuming....

maybe not call them costuems, that changes my idea of the thing and sets it in a very
DLC orientation. perhaps it is like the facebook sticker thing where you get them all

should we make it all abut pusheen? i dunno.
NO. this should be modular. expect / pretend like another character can sit in


feeding needs to be its own thing? 
yeah, because there is a tomagatchi aspect to this whole thing



----

necessary:

waiting
celebrating
eating


costumes unlock default animations
costumes add celebrate/dance/waiting animations
clicking on the pusheen cycles through the costume based animations
	which include the celebrate/dance/waiting animations

most costumes can be simple things
costumes are passivable - that is the main requirement

Button menu:

open/close menu

change costume
	- lists all costumes
random costume




--- Costumes ---

Sherlock
Unicorn
Fancy
Shades
Kitty Perry
Harry Potter
R2D2
3D pusheen
Cupid
Santa
Food Pusheens
Techno
Giant pusheen
Stormy the cat
Uniqlo pusheen
mustache pusheen
halloween pusheen
Career pusheen
4th of july pusheen
lazy pusheen
batman
celebrity pusheen
16-bit pusheen
pokemon pusheen
my little pusheen
skyrim pusheen

/////////////////
/////////////////


leveling up: every 7 levels, you gain a new costume






-- interaction
when you click on the buddy, the menu icons appear
showing food/play/? buttons


*/

var STORAGE_STR = "storage";



var Avatar = can.Map.extend({}, {
	init: function(){

		this.xpPerLevel = 7;

		this.attr('xp', this.getXP());
		this.updateLevel();


		this.name = "pusheen";

		this.animationTimeout = null;

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

		this.numPartyImgs = 9;

		// this.allStrs = []
		// for(var i = 0; i < this.numPartyImgs; i++ ) {
		// 	this.allStrs.push("")
		// }
		// this.allStrs.concat(foodStrs)
		// this.allStrs.concat(playStrs)
		this.loadCostumes();

		this.attr('currentSrc', this.normalSrc);
		this.attr('isBusy', false);

		this.currentPartyImgNum = -1;
		this.animationTimeout = -1;




		this.render();
		
	},

	render: function(){
		this.div = $("<div id='avatar-wrap'>");
		$('body').append(this.div);
		this.control = new AvatarControl( this.div, {avatar: this});
	},


	// ======= Animation related Code ======== //

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

	toAny: function(){
		var rand = Util.getRandomInt(0,100);
		if (rand < 33){
			this.toPlaying();
		} else if (rand < 66){
			this.toEating();
		} else if (rand <= 100){
			this.toExcited();
		}
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
			case 'any':
				this.toAny();
			default:
				return;
		}

		var _this = this;
		this.animationTimeout = setTimeout(function(){
			_this.toNormal();
		}, Util.getRandomInt(options.duration - 400, options.duration + 400));
	},


	// ===== XP related code ====== //

	// Moved this stuff to the avatar_control
	onXPChange: function(amount){
		// This should track internal changes.
		// the control is in charge of view changes
		this.updateLevel();
	},

	checkXP: function(){
		var xp = localStorage.getItem(STORAGE_STR);
		if (xp == null){
			localStorage.setItem(STORAGE_STR, 0);
		}
	},

	getXP: function(){
		this.checkXP();

		return localStorage.getItem(STORAGE_STR);
	},

	changeXP: function(val){
		this.checkXP();

		var xp = parseInt(localStorage.getItem(STORAGE_STR));
		xp += val;
		this.lastXPIncrease = val;

		// console.log(lastXPIncrease)

		this.attr('xp', xp);
		// Here is where we pass it on
		this.onXPChange(val);


		localStorage.setItem(STORAGE_STR, xp);
	},

	increaseXP: function(amount){
		var amt = amount == undefined ? 1 : amount;

		this.checkXP();
		this.changeXP(amt);
	},

	decreaseXP: function(amount){
		var amt = amount == undefined ? 1 : amount;

		this.checkXP();
		this.changeXP( -amt );
	},


	undoXPChange: function(){
		this.checkXP();
		this.changeXP( -this.lastXPIncrease );
	},

	alertXP: function(){
		// not using this anymore
		// return;

		var str = "XP: " + this.getXP()
		console.log(str);
		// alert(str);
	},

	// ===== Level related code ====== //

	isNewLevel: function(){
		return (this.xp % this.xpPerLevel) == 0;
	},

	updateLevel: function(){
		this.attr('level', this.getLevel());
	},

	getLevel: function(){
		return Math.floor(this.xp / this.xpPerLevel) + 1;
	},


	// ===== Costume selection code ==== //

	loadCostumes: function(){
		this.costumes = CostumeData;

		if (localStorage.getItem('normal_costume') === 'true'){
			this.attr('normalSrc', localStorage.getItem('normal_src'));	
			this.attr('currentSrc', localStorage.getItem('normal_src'));
		}
		// console.log(this.costumes);
	},

	changeCostume:function (costume){
		console.log("changing to " + costume.name);

		localStorage.setItem('normal_costume', 'true');
		localStorage.setItem('normal_src', costume.normalSrc);

		this.attr('normalSrc', costume.normalSrc);
		this.attr('currentSrc', costume.normalSrc);
	}

});





// var foo = new Avatar(100);



module.exports = Avatar;