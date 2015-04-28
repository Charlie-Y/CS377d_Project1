var $ = require('jquery');
var _can = require('./can.jquery.js');
var Util = require('./util.js');



var AvatarControl = can.Control.extend({
	defaults: {
		imgClass: 'avatar-img',
		hideActionButtonClass: "close",
		foodButtonClass: "food",
		playButtonClass: "play",
		anyButtonClass: "any",
		isDev: false
	}
},{
	init: function(el, options){
		this.avatar = options.avatar;
		this.element.html(can.view( Util.extentionStr + 'mustache/main.mustache', options));
		this.showingActionButtons = false;
	},

	// "{avatar} change": function(ev, newVal, oldVal){
	// 	console.log("Level changed from " + oldVal + " to " + newVal);
	// },

	"{avatar} level": function(avatar, eventType, newVal, oldVal){
		// console.log("Level changed from " + oldVal + " to " + newVal);
		var amount = newVal - oldVal;

		if (amount > 0){

			this.avatar.playAnimation({
				type: 'excited',
				duration: 1500	
			})

			this.showLevelUp(amount);
		}

	},



	".level-up-button click": function(el, ev){

		this.showLevelUp(4);
	},

	// show the buttons
	".{imgClass} click": function(el, ev ){
		if (!this.showingActionButtons){
			this.showActionButtons();
		}	else {
			this.hideActionButtons();
		}

	},

	".{hideActionButtonClass} click": function(el, evl){
		this.hideActionButtons();
	},

	".{foodButtonClass} click": function(el, evl){
		this.avatar.playAnimation({
				type: 'food',
				duration: 2500	
			})
	},

	".{playButtonClass} click": function(el, evl){
		this.avatar.playAnimation({
				type: 'play',
				duration: 2500	
			})
	},

	".{anyButtonClass} click": function(el, evl){
		this.avatar.playAnimation({
				type: 'any',
				duration: 2500	
			})
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
		var buttons = this.element.find('.action-buttons .button')
		buttons.removeClass('hide bounceOut')
		buttons.addClass('animated bounceIn');

		buttons.unbind();
		
		buttons.bind(Util.animEndStr, function(){
			// console.log("showActionButtons one");
			$(this).removeClass('bounceIn');

			$(this).unbind();
		})

	},

	hideActionButtons: function(){
		// console.log("hideActionButtons");
		this.showingActionButtons = false;
		var buttons = this.element.find('.action-buttons .button')

		buttons.removeClass('bounceIn');
		buttons.addClass('bounceOut');

		buttons.unbind();

		buttons.bind(Util.animEndStr, function(){
			// console.log("hideActionButtons one");

			$(this).addClass('hide');
			$(this).removeClass('bounceOut');

			$(this).unbind();
		})
	},

	// pops up a little animation...
	showLevelUp: function(amount){

		for (var i = 0; i < amount; i++){
			console.log("showLevelUp");
			var _this = this;

			setTimeout(function(){
				// this.options.attr('levelUpVal', avatar.level);
				_this.showPopupMessage({
					txt: "+1",
					// color: 
					randomLocation: true
				});
			}, 70 * i);
		}

	},

	/*
	
	Popups up a little message thingy

	options is an object with a few defaults 
	options = {
		txt: the string, default none
		color: the color of the thing, default green
		randomLocation: to randomly perturb or not, default nope
		duration: ... this one is a bit harder to, default 1s
	}

	*/
	showPopupMessage: function(options){
		if (options == undefined){
			console.error('showPopupMessage needs an argument passed in');
			return;
		}

		var message = $("<div class='level-up-message animated fadeOutUp'>");

		message.text( options.txt);

		// expected to short circtui on failures
		if (options.randomLocation != undefined && options.randomLocation){
			// randomly perturb the +1s
			message.css('width', Util.getRandomInt(80, 120) + "%");
			message.css('top', Util.getRandomInt(-10, 0) + "px");
		}

		if (options.color != undefined ){
			message.css('color', options.color)
		}


		if (options.duration != undefined){
			message.css('-webkit-animation-duration', options.duration)
		}

		$(this.element).append(message);

		message.one(Util.animEndStr, function(){
			message.remove();
		})
	}

});

module.exports = AvatarControl;












