var signIn = document.getElementById('sign-in');
var headerAuthSign = document.getElementById('header-auth-sign');
headerAuthSign.onmouseover = function () {
	signIn.style.cssText = "display: block;";
	headerAuthSign.style.cssText = "background-color: #F6A263;";
}
headerAuthSign.onmouseout = function () {
	signIn.style.display = "none";
	headerAuthSign.style.backgroundColor = "#fff";
}
signIn.onmouseover = function () {
	signIn.style.display = "block";
	headerAuthSign.style.backgroundColor = "#F6A263";
}
signIn.onmouseout = function () {
	signIn.style.display = "none";
	headerAuthSign.style.backgroundColor = "#fff";
}