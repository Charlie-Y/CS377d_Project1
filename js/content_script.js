


(function (){

	var extentionStr = "chrome-extension://ebdhakdfjbdppmnneefbggbdnmjinllp/";

	function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function Avatar(level){
		this.level = level;
		this.name = "pusheen";

		this.animationTimeout = null;
		this.mainImg = undefined;

		// $ gifsicle -b pusheen_happy.gif --loopcount

		this.normalSrc = extentionStr + "images/pusheen_normal.gif";

		this.partyImgBaseStr = extentionStr + "images/pusheen_party";
		this.numPartyImgs = 5;
		this.currentPartyImgNum = -1;

		this.render();

	}

	Avatar.prototype.render = function(){
		var div = $("<div id='avatar-wrap'>");
		var img = $("<img class='avatar-img' id='avatar-1'>");


		img.attr('src', this.normalSrc);
		img.attr('loop', true);

		div.append(img);

		$('body').append(div);

		this.mainImg = img;
	}


	Avatar.prototype.onLevelChange = function(amount){
		console.log("Level changed: " + amount);

		if (amount > 0){

			clearTimeout(this.animationTimeout);
			
			this.toHappy();

			var _this = this;
			this.animationTimeout = setTimeout(function(){
				_this.toNormal();
			}, getRandomInt(1300, 2000));

		}
	}

	Avatar.prototype.toNormal = function(){
		this.mainImg.attr("src", this.normalSrc);
	}

	Avatar.prototype.toHappy = function(){
		this.mainImg.attr("src", this.getPartyImg());
	}


	Avatar.prototype.getPartyImg = function(){
		
		var num = getRandomInt(0, this.numPartyImgs - 1);

		if (num == this.currentPartyImgNum){
			num = (num + 1) % this.numPartyImgs;
		}

		this.currentPartyImgNum = num;

		return this.partyImgBaseStr + num.toString() + ".gif";
	}


	var avatar = new Avatar(200);




	// console.log("content_script.js start");

	var STORAGE_STR = "storage";

	var BODY_SELECTOR = ".cI";
	var MARK_DONE_SELECTOR = ".itemIconDone";
	var MARK_UNDONE_SELECTOR = ".itemIconMarkedDone";
	var SWEEP_SELECTOR= "button.dr";
	var SWEEP_LIST_SELECTOR = ".DsPmj";
	var SWEEP_ITEM_SELECTOR = ".scroll-list-item";

	var UNDO_SELECTOR = "span.fD";
	var UNDO_PARENT_SELECTOR = ".IbRB2e";


	var lastLevelIncrease = 0;


	function checkLevel(){
		var level = localStorage.getItem(STORAGE_STR);
		if (level == null){
			localStorage.setItem(STORAGE_STR, 0);
		}
	}

	function getLevel(){
		checkLevel();

		return localStorage.getItem(STORAGE_STR);
	}

	function changeLevel(val){
		checkLevel();
		var level = parseInt(localStorage.getItem(STORAGE_STR));
		level += val;
		lastLevelIncrease = val;

		avatar.onLevelChange(val);

		localStorage.setItem(STORAGE_STR, level);
	}

	function increaseLevel(amount){
		var amt = amount == undefined ? 1 : amount;

		checkLevel();
		changeLevel(amt);
	}

	function decreaseLevel(amount){
		var amt = amount == undefined ? 1 : amount;

		checkLevel();
		changeLevel( -amt );
	}


	function undoLevelChange(){
		checkLevel();
		changeLevel( -lastLevelIncrease );
	}

	function alertLevel(){
		var str = "Level: " + getLevel()
		console.log(str);
		// alert(str);
	}


	function bindClickEvents(){
		$(BODY_SELECTOR).on('click', MARK_DONE_SELECTOR, function(event){
			console.log("mark done clicked");
			increaseLevel(1);
			alertLevel();
		})

		// TODO: will also need to react to Confirm Sweepalls
		// TODO: also react to Bundled sweepalls, like PROMO sweepalls
		$(BODY_SELECTOR).on('click', SWEEP_SELECTOR, function(event){

			// figures out how many
			var button = event.target;
			var parent = $(button.closest(SWEEP_LIST_SELECTOR));
			var items = parent.find(SWEEP_ITEM_SELECTOR);

			// needs to check if the sweep many appears
			// there needs to be some way to figure out how many are swept away
			// probably set up some kind of delay before checking...
			console.log("sweep all clicked, " + items.size() + " items cleared");
			increaseLevel(items.size());

			console.log("Level: " + getLevel());	
		})


		$(BODY_SELECTOR).on('click', MARK_UNDONE_SELECTOR, function(event){
			console.log("mark undone clicked");

			// undoLevelChange();
			decreaseLevel(1);
			console.log("Level: " + getLevel());	
		})

		$(UNDO_PARENT_SELECTOR).on('click', UNDO_SELECTOR, function(event){
			console.log("undo clicked");

			undoLevelChange();
			console.log("Level: " + getLevel());	
		})

	}

	function checkEventsBinded(){
		if ($._data($('.cI').get(0), "events") == undefined){
		// if ($._data($('.scroll-list-item').get(0), "events") == undefined){
			console.log("bind failed");
			return false;
		} else {
			console.log("bind successful");
			return true;
		}
	}



	// Here is where everything is bound
	$(document).ready( function(){
		var intervalId = setTimeout(function(){
			bindClickEvents();
			// console.log($._data($('.scroll-list-item').get(0), "events"));	
			checkEventsBinded();
		}, 0);
	});










	// This is here in case there is an execution error
	console.log("content_script.js finish");

})();










