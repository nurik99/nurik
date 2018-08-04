var mobile = document.getElementById('mobile');
var backdrop = document.getElementById('backdrop');
menu = () => {
	if(mobile.style.left == "-40%") {
		mobile.style.left = "0";
		backdrop.style.display = "block";
	}
	else {
		mobile.style.left = "-40%";
	}
}
function backNone() {
	mobile.style.left = "-40%";
	backdrop.style.display = "none";
}
