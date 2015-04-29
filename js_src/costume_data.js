var $ = require('jquery');
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



var data = {};
module.exports = data;









