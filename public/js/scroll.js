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
	
	// 	document.getElementById('header').style.position = "fixed";
}
window.onscroll = function () {
	var position = window.pageYOffset;
	var up = document.getElementById('up');
	var conFilter = document.getElementById('content-filter');
	if(position >= 250) {
		up.style.display = "flex";
	}
	else {
		up.style.display = "none";
	}
	// if(position >= 500) {
	// 	conFilter.style.marginTop = (conFilter.style.marginTop + "50") + "px";
	// }
}

onclickOnKey = () => {
	var position = window.pageYOffset;
	window.scrollTo(0, position);
}