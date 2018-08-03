const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');

nextSlide = () => {
	if (btn1.style.zIndex == 3) {
		btn1.style.zIndex = "1";
	}
	else {
		btn1.style.zIndex = "3";
	}
}