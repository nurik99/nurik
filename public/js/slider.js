var slider = document.getElementById('slider');
var slider_list = document.getElementsByClassName('slider-item');
var len = slider_list.length;
var current_slide = 0;
var indicator_list = document.getElementsByClassName('slider-ind__slide');
var prev = document.getElementById('prev');
var next = document.getElementById('next');

slider.style.width = (len * 100)+ "%";

for (var i = 0; i <len; i++){
	slider_list[i].style.width = (100/len) + "%";
}

function HideShow() {
	if(current_slide == len - len)
		prev.style.display = "none";
	else
		prev.style.display = "block";
	if(current_slide == len - 1)
		next.style.display = "none";
	else
		next.style.display = "block";
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
		HideShow();
	}
	else {
		removeActive();
		current_slide++;
		setActive();
		setSlide();
		HideShow();
	}
}

function backSlide(){
	clearInterval(timerId);
	if (current_slide == 0){
		removeActive();
		current_slide = len - 1;
		setActive();
		setSlide();
		HideShow();
	}
	else {
		removeActive();
		current_slide--;
		setActive();
		setSlide();
		HideShow();
	}
}

function setSlidebyIndicator(index) {
	clearInterval(timerId);
	removeActive();
	current_slide = index;
	setActive();
	setSlide();
	HideShow();
}
var time = 5000;
var timerId = setInterval(function() {
	if (current_slide == len - 1) {
		removeActive();
		current_slide = len - len;
		setActive();
		setSlide();
		HideShow();
	}
	else {
		removeActive();
		current_slide++;
		setActive();
		setSlide();
		HideShow();
	}
}, time);
// document.addEventListener("DOMContentLoaded", function(event) { 
	
// });