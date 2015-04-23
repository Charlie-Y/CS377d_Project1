


(function (){

	console.log("content_script.js start");

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


	/// 
	// console.log($(".scroll-list-item"));

	$(document).ready( function(){
		console.log("ready");

		$(".scroll-list-item").click(function(event){
			console.log("BAR");

			if ($(event.target).hasClass("itemIconDone")){
				increaseLevel();
				console.log("Level: " + getLevel());
			}

		})

		// $(document).on("click", ".scroll-list-item", function(event){
		// 	console.log("BAR2");

		// 	if ($(event.target).hasClass("itemIconDone")){
		// 		increaseLevel();
		// 		console.log("Level: " + getLevel());
		// 	}

		// })

		$(document).click(function(){
			console.log("FOOBAR");
		})

	});


	console.log("content_script.js finish");

})();