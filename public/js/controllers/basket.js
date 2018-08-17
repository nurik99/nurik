app.controller('BasketCtrl', BasketCtrl);

BasketCtrl.$inject = ['$http', '$scope', 'basket'];

function BasketCtrl($http, $scope, basket) {
	var vm = this;

	vm.basket = basket.getCart();

	vm.v = "KZT";
}