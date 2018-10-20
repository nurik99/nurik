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
backNone = () => {
	mobile.style.left = "-40%";
	backdrop.style.display = "none";
}
var newmenu = document.getElementById('newmenu');
function NewMenu1() {
	newmenu.style.display = 'block';
	console.log('Sucess');
}
function NewMenu2() {
	newmenu.style.display = 'none';
	console.log('Sucess');
}