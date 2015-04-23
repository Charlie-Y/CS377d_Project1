function createScript(scriptName, onloadFn){
	var s = document.createElement('script');
	// TODO: add "script.js" to web_accessible_resources in manifest.json
	s.src = chrome.extension.getURL(scriptName);
	s.onload = function() {
	    this.parentNode.removeChild(this);
	    onloadFn();
	};

	(document.head||document.documentElement).appendChild(s);	
}


createScript('jquery.js', function(){
	createScript('content_script.js', function(){});	
});
