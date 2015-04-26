var _can = require('./can.jquery.js');
var Util = require('./util.js');

var AvatarControl = can.Control({
	init: function(el, options){
		this.avatar = options.avatar;
		this.element.html(can.view( Util.extentionStr + 'mustache/main.mustache', options));
	}
});

module.exports = AvatarControl;