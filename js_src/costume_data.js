var $ = require('jquery'); 
var Util = require('./util.js');

var _can = require('./can.jquery.js');
/*

This just exports a giant JS object which has data on it


CostumeData:

img file format: 

[base]_[type]_[num]

ex: 

pusheenicorn_normal_0

{
	name: 'Pusheenicorn!',
	base: 'pusheenicorn',
	normal: 2, 
	excited: 3,
	food: 0
}

{
	name:
	base:
	normal:
	excited:
	food: 
}

name: "presentable name", people will see this name
base: img base string. [base]_[type]_[num]
normal: number of images with format [base]_normal_[num], these will
be played while nothing is happening
excited: [base]_excited_[num] - these will be played on a mark done
food: [base]_food_[num] - played when you press the feed button, don't do for now


*/

var c = can.Construct.extend({},
{
	init: function(name, baseStr, normalNum, excitedNum, foodNum){
		this.name = name;
		this.base = baseStr || "pusheen";
		this.normalNum = normalNum || 0;
		this.excitedNum = excitedNum || 0;
		this.foodNum = foodNum || 0 ;

		this.normalSrc = Util.extentionStr + "images/" + this.base + "_" + "normal" + "_0.gif";
	}
})


var data = new can.List([
	new c('Pusheen the Cat', 'normal', 1, 1, 0),
	new c('Lazy Pusheen', 'lazy', 1, 1, 0),
	new c('Pusheenicorn', 'pusheenicorn', 1, 1, 0),
	new c('Sherlock Pusheen', 'sherlock', 1, 1, 1),
	new c('Fancy Pusheen', 'fancy', 1, 1, 1),
	new c('Pusheen in Shades', 'shades', 3, 1, 0),
	new c('Catniss Pusheen', 'catniss', 1, 0, 0),
	new c('Pusheen the Adventurer', 'adventuretime', 1, 0, 0),
	new c('Pusheen in Bread', 'bread', 1, 0, 0),
	new c('Sailor Mew', 'sailormew', 1, 0, 0),
	new c('R2P2', 'r2d2', 1, 0, 0),
	new c('Kitty Perry', 'kittyperry', 1, 0, 0)

]);

module.exports = data;









