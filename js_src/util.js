var Util = {};
module.exports = Util;

Util.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Util.extentionStr = chrome.extension.getURL('');