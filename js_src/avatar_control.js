var $ = require('jquery');
var _can = require('./can.jquery.js');
var Util = require('./util.js');



var AvatarControl = can.Control.extend({
	defaults: {
		imgClass: 'avatar-img',
		menuButtonClass: "menu",
		costumeButtonClass: "costume",
		foodButtonClass: "food",
		statButtonClass: "stat",
		isDev: true
	}
},{
	init: function(el, options){
		this.avatar = options.avatar;
		this.options.costumes = this.avatar.costumes;

		this.options.levelPercent = can.compute(0);
		this.options.animateLevelProgress = can.compute(true);
		this.updateLevelPercent();

		this.element.html(can.view( Util.extentionStr + 'mustache/main.mustache', options));
		this.showingActionButtons = false;

		this.costumeEl = this.element.find('.costumes');
		this.showingCostumes = !this.costumeEl.hasClass('hide');


		// this.showActionButtons();

	},

	// "{avatar} change": function(ev, newVal, oldVal){
	// 	console.log("Level changed from " + oldVal + " to " + newVal);
	// },

	"{avatar} xp": function(avatar, eventType, newVal, oldVal){
		// console.log("Level changed from " + oldVal + " to " + newVal);
		var amount = newVal - oldVal;

		this.updateLevelPercent(newVal, oldVal);


		if (amount > 0){

			this.avatar.playAnimation({
				type: 'excited',
				duration: 1500	
			})

			// Hum, what to do if many things appear
			if (!avatar.isNewLevel()){
				this.showXPUp(amount);
			}
		}

	},

	"{avatar} level": function(avatar, eventType, newVal, oldVal){
		var amount = newVal - oldVal;
		if (amount > 0){
			if (avatar)
			this.showLevelUp()
		}
	},


	".level-up-button click": function(el, ev){

		// this.showLevelUp();
		// this.showXPUp(5);
		this.avatar.increaseXP(1);
		// this.updateLevelPercent();
	},

	// show the buttons
	".{menuButtonClass} click": function(el, ev ){
		if (!this.showingActionButtons){
			this.showActionButtons();
		}	else {
			this.hideActionButtons();
		}

	},

	// Prevent scroll events from bubbling out of the costume selector
	".costumes mousewheel": function(el, ev){
		var height = el.outerHeight();
		var scrollHeight = el.get(0).scrollHeight;
		var delta = -ev.originalEvent.deltaY;

		if(el.get(0).scrollTop === (scrollHeight - height) && delta < 0) {
			ev.preventDefault();
			// ev.stopPropagation();
		} else if (el.get(0).scrollTop === 0 && delta > 0) {
			ev.preventDefault();
		}
	},

	".{foodButtonClass} click": function(el, evl){
		this.avatar.playAnimation({
				type: 'food',
				duration: 2500	
			})
	},

	".{costumeButtonClass} click": function(el, evl){
		if (this.showingCostumes){
			this.costumeEl.slideUp();
			this.showingCostumes = false;
		} else {
			this.costumeEl.removeClass('hide');
			this.costumeEl.slideDown();
			this.showingCostumes = true;
		}
	},


	".costume-img-wrap click": function(el, ev){
		var costume = el.data('costume');
		this.avatar.changeCostume(costume);

	},

	".{imgClass} mousemove": function(el, ev){
		// console.log('mousemove');
		// if (!this.avatar.isBusy){
		// 	this.avatar.toExcited();
		// }
	},

	".{imgClass} mouseleave": function(el, ev){
		// console.log('mouseleave');
		// if (!this.avatar.isBusy){
		// 	this.avatar.toNormal();
		// }
	},


	showActionButtons: function(){
		// console.log("showActionButtons");

		this.showingActionButtons = true;
		var buttons = this.element.find('.action-buttons .action-button')


		buttons.removeClass('sneak bounceOut');
		buttons.addClass('animated bounceIn');
		buttons.unbind();
		buttons.bind(Util.animEndStr, function(){
			// console.log("showActionButtons one");
			$(this).removeClass('bounceIn');

			$(this).unbind();
		})

		var levelInfo = this.element.find('.level-info');
		levelInfo.removeClass('sneak bounceOut')
		levelInfo.addClass('animated bounceIn');
		levelInfo.unbind();
		levelInfo.bind(Util.animEndStr, function(){
			// console.log("showActionButtons one");
			$(this).removeClass('bounceIn');

			$(this).unbind();
		})		

	},

	hideActionButtons: function(){
		// console.log("hideActionButtons");
		this.showingActionButtons = false;
		var buttons = this.element.find('.action-buttons .action-button')
		buttons.removeClass('bounceIn');
		buttons.addClass('bounceOut');
		buttons.unbind();
		buttons.bind(Util.animEndStr, function(){
			// console.log("hideActionButtons one");
			$(this).addClass('sneak');
			$(this).removeClass('bounceOut');
			$(this).unbind();
		})

		var levelInfo = this.element.find('.level-info');
		levelInfo.removeClass('bounceIn');
		levelInfo.addClass('bounceOut');
		levelInfo.unbind();
		levelInfo.bind(Util.animEndStr, function(){
			// console.log("hideActionButtons one");

			$(this).addClass('sneak');
			$(this).removeClass('bounceOut');

			$(this).unbind();
		})

		this.costumeEl.slideUp();
		this.showingCostumes = false;
	},

	// pops up a little animation...
	showXPUp: function(amount){

		for (var i = 0; i < amount; i++){
			// console.log("showLevelUp");
			var _this = this;

			setTimeout(function(){
				// this.options.attr('levelUpVal', avatar.level);
				_this.showPopupMessage({
					txt: "+1",
					// color: 
					randomLocation: amount != 1
				});
			}, 150 * i);
		}

	},


	showLevelUp: function(){
		this.showPopupMessage({
			txt: "Level Up!",
			color: "#4285f4", // chrome inbox header color
			duration: 6000
			// randomLocation:
		});
	},
	/*
	
	Popups up a little message thingy

	options is an object with a few defaults 
	options = {
		txt: the string, default none
		color: the color of the thing, default green
		randomLocation: to randomly perturb or not, default nope
		duration: TODO... this one is a bit harder to, default 1s

	}

	*/
	showPopupMessage: function(options){
		if (options == undefined){
			console.error('showPopupMessage needs an argument passed in');
			return;
		}

		var message = $("<div class='level-up-message'>");
		var levelInfo = this.element.find(".level-info");

		message.text( options.txt);

		// expected to short circtui on failures
		if (options.randomLocation != undefined && options.randomLocation){
			// randomly perturb the +1s
			message.css('width', Util.getRandomInt(50, 150) + "%");
			message.css('top', Util.getRandomInt(-10, 0) + "px");
		}



		if (options.color != undefined ){
			message.css('color', options.color)
		}


		if (!this.showingActionButtons){
			levelInfo.removeClass('sneak');
		}

		message.addClass('animated fadeOutUpWait');
 
		$(this.element).append(message);

		clearTimeout( this.anim2Timeout);

		var _this = this;
		message.one(Util.animEndStr, function(){
			message.remove();

			_this.anim2Timeout = setTimeout(fuction(){
				if (!_this.showingActionButtons){
					levelInfo.addClass('sneak');
				}
			}, 500)
		})
	},


	updateLevelPercent: function(newVal, oldVal){
		var a = this.avatar;
		var amount = newVal - oldVal;
		// var timesLeveled = Math.floor( (amount) / this.avatar.xpPerLevel);


		// console.log("timesLeveled: " + timesLeveled);

		// clearTimeout(this.levelPercentTimeout);

		// for (var i = 0; i < timesLeveled; i++){
		// 	this.options.levelPercent(100);
		// 	setTimeout(function(){
		// 		_this.options.levelPercent(0);
		// 	}, 1500);
		// }


		var val = (( a.xp % a.xpPerLevel ) / (a.xpPerLevel)).toFixed(2) * 100;

		clearTimeout(this.levelPercentTimeout);

		if (val == 0 && amount > 0){
			// this.options.attr('levelPercent', 100);
			this.options.levelPercent(100);

			var _this = this;
			setTimeout(function(){
				_this.options.levelPercent(0);
			}, 1500);

		} else {
			// this.options.attr('levelPercent', val);
			this.options.levelPercent(val);
		}
		// console.log("updateLevelPercent: " + val);
		// this.options.levelPercent(val);

	}

});

module.exports = AvatarControl;












