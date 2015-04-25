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

function createStylesheet(filename){
	var style = document.createElement('link');
	style.rel = 'stylesheet';
	style.type = 'text/css';
	style.href = chrome.extension.getURL(filename);
	(document.head||document.documentElement).appendChild(style);
}

// Need a way to pass this to the content_script
console.log(chrome.extension.getURL("images/pusheen_normal.gif"));

window.url123 = chrome.extension.getURL("images/pusheen_normal.gif");

var thing = document.createElement('div');
thing.id = "extension-holder";
thing.setAttribute('data-extension-id', chrome.extension.getURL(''));

var body = document.querySelector('body');
body.appendChild(thing);



console.log(thing);

// Add them here so i Don't have to reload the page everytime i change the css
createStylesheet("styles/styles.css");

createScript('js/jquery.js', function(){
	createScript('js/content_script.js', function(){});	
});
