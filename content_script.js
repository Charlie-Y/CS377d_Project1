


(function (){

	// console.log("content_script.js start");

	var STORAGE_STR = "storage";


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

	function increaseLevel(){
		checkLevel();
		var level = parseInt(localStorage.getItem(STORAGE_STR));
		level += 1;
		localStorage.setItem(STORAGE_STR, level);
	}

	function bindClickEvents(){
		$(".scroll-list-item").click(function(event){
			console.log("click");

			if ($(event.target).hasClass("itemIconDone")){
				increaseLevel();
				console.log("Level: " + getLevel());
			}

		})
	}

	function checkEventsBinded(){
		if ($._data($('.scroll-list-item').get(0), "events") == undefined){
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










