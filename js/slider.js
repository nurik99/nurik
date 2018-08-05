var slider = document.getElementById('slider');
var slider_list = document.getElementsByClassName('slider-item');
var len = slider_list.length;
var current_slide = 0;
var indicator_list = document.getElementsByClassName('slider-ind__slide');

slider.style.width = (len * 100)+ "%";

for (var i = 0; i <len; i++){
	slider_list[i].style.width = (100/len) + "%";
}

function setSlide() {
	slider.style.left = (-100 * current_slide) + '%';
}

function setActive() {
	indicator_list[current_slide].className = 'slider-ind__slide active';
}

function removeActive() {
	indicator_list[current_slide].className = 'slider-ind__slide';
}

function nextSlide() {
	clearInterval(timerId);
	if (current_slide == len - 1) {
		removeActive();
		current_slide = len - len;
		setActive();
		setSlide();
	}
	else {
		removeActive();
		current_slide++;
		setActive();
		setSlide();
	}
	// setTimeout(function() {
	// 	slider_nurik();
	// 	console.log("slider started");
	// }, 10000);
}

function backSlide(){
	clearInterval(timerId);
	if (current_slide == 0){
		removeActive();
		current_slide = len - 1;
		setActive();
		setSlide();
	}
	else {
		removeActive();
		current_slide--;
		setActive();
		setSlide();
	}
	// setTimeout(function() {
	// 	slider_nurik();
	// 	console.log("slider started");
	// }, 10000);
}

function setSlidebyIndicator(index) {
	removeActive();
	current_slide = index;
	setActive();
	setSlide();
}
var time = 6000;
var timerId = setInterval(function() {
	if (current_slide == len - 1) {
		removeActive();
		current_slide = len - len;
		setActive();
		setSlide();
	}
	else {
		removeActive();
		current_slide++;
		setActive();
		setSlide();
	}
}, time);
function slider_nurik() {
	var timerId = setInterval(function() {
		if (current_slide == len - 1) {
			removeActive();
			current_slide = len - len;
			setActive();
			setSlide();
		}
		else {
			removeActive();
			current_slide++;
			setActive();
			setSlide();
		}
	}, time);
}