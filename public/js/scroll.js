function upScroll() {
	var position;
	position = window.pageYOffset;
	var el_pos = document.body.offsetTop;
	var interval = setInterval(function(){
		position -= 8;
		if (position <= el_pos - 60) {
			clearInterval(interval);
		}
		else {
			window.scrollTo(0, position);
		}
	}, 0)
	
	// if(position >= 45) {
	// 	document.getElementById('header').style.position = "fixed";
	// 	document.getElementById('header').style.zIndex = "50";
	// 	document.getElementById('header').style.top = "0";
	// 	document.getElementById('header').style.left = "0";
	// 	document.getElementById('header').style.opacity = "0.9";

	// 	document.getElementById('headerInfo').style.position = "fixed";
	// 	document.getElementById('headerInfo').style.zIndex = "50";
	// 	document.getElementById('headerInfo').style.top = "76px";
	// 	document.getElementById('headerInfo').style.left = "0";
	// }
	// else {
	// 	document.getElementById('header').style.position = "static";
	// 	document.getElementById('headerInfo').style.position = "static";
	// }
}