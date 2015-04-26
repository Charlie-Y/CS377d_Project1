var $ = require('jquery');
var _can = require('./can.jquery.js');
var Util = require('./util.js');



var AvatarControl = can.Control.extend({
	defaults: {
		imgClass: 'avatar-img',
		isDev: true
	}
},{
	init: function(el, options){
		this.avatar = options.avatar;
		this.element.html(can.view( Util.extentionStr + 'mustache/main.mustache', options));
	},

	// "{avatar} change": function(ev, newVal, oldVal){
	// 	console.log("Level changed from " + oldVal + " to " + newVal);
	// },

	"{avatar} level": function(avatar, eventType, newVal, oldVal){
		// console.log("Level changed from " + oldVal + " to " + newVal);
		var amount = newVal - oldVal;

		if (amount > 0){
			clearTimeout(this.animationTimeout);
			
			avatar.toHappy();

			var _this = avatar;
			this.animationTimeout = setTimeout(function(){
				_this.toNormal();
			}, Util.getRandomInt(1300, 2000));

			this.showLevelUp(amount);
		}

	},

	".level-up-button click": function(el, ev){

		this.showLevelUp(4);
	},

	"{imgClass} click": function(el, ev ){

	},

	"{imgClass} mouseover": function(el, ev){

	},


	// pops up a little animation...
	showLevelUp: function(amount){

		for (var i = 0; i < amount; i++){
			console.log("showLevelUp");
			var _this = this;

			setTimeout(function(){
				// this.options.attr('levelUpVal', avatar.level);
				var levelUpMessage = $("<div class='level-up-message animated fadeOutUp'>");
				levelUpMessage.text('+' + 1);

				// randomly perturb the +1s
				levelUpMessage.css('width', Util.getRandomInt(80, 120) + "%");
				levelUpMessage.css('top', Util.getRandomInt(-10, 0) + "px");

				$(_this.element).append(levelUpMessage);

				levelUpMessage.one(Util.animEndStr, function(){
					levelUpMessage.remove();
				})
			}, 70 * i);
		}

	}

});

module.exports = AvatarControl;