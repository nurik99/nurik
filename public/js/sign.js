var signIn = document.getElementById('sign-in');
var headerAuthSign = document.getElementById('header-auth-sign');
headerAuthSign.onmouseover = function () {
	signIn.style.cssText = "display: flex;";
	headerAuthSign.style.cssText = "background-color: #F6A263;border-radius: 20px 0 0 0;";
}
headerAuthSign.onmouseout = function () {
	signIn.style.display = "none";
	headerAuthSign.style.cssText = "background-color: #fff;border-radius: 20px;";
}
signIn.onmouseover = function () {
	signIn.style.display = "flex";
	headerAuthSign.style.cssText = "background-color: #F6A263;border-radius: 20px 0 0 0;";
}
signIn.onmouseout = function () {
	signIn.style.display = "none";
	headerAuthSign.style.cssText = "background-color: #fff;border-radius: 20px;";
}