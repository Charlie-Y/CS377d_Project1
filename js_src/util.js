var $ = require('jquery');
var Util = {};
module.exports = Util;

Util.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// If injecting
Util.extentionStr = $('#extension-holder').attr('data-extension-id');

//if not injeting
// Util.extentionStr = chrome.extension.getURL('');

Util.animEndStr = 'webkitAnimationEnd';