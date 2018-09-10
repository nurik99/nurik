app.controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['$http', '$scope', 'basket', '$interval','$state', '$rootScope', '$cookies'];

function HomeCtrl($http, $scope, basket, $interval, $state, $rootScope, $cookies) {
	var vm = this;

	if($cookies.getObject('session')) {
		$rootScope.session = $cookies.getObject('session');
	}
	vm.controllerState = $state.current.name;
	
	vm.basketInfo = basket.infoCart();

	vm.delBasket = basket.delCart;

	vm.info = basket.info;
	
	vm.logout = function(){
		$http.post('/api/logout')
			.success(function(responce) {
				console.log($rootScope.session);
				$rootScope.session = undefined;
				$state.go('home');
			})
			.error(function(err) {
				console.log(err);
			})
	}
	// vm.basketIn = $interval(function(){basket.infoCart(); return console.log(basket.infoCart());}, 1000);

	vm.products = [
		{
			name: 'Пицца 1',
			price: 2500,
			desc: 'Пицца - куриная'
		},
		{
			name: 'Пицца 2',
			price: 3000,
			desc: 'Пицца - ?'
		},
		{
			name: 'Пицца 3',
			price: 2700,
			desc: 'Пицца - ?'
		},
		{
			name: 'Пицца 4',
			price: 2200,
			desc: 'Пицца - ?'
		},
		{
			name: 'Пицца 5',
			price: 2000,
			desc: 'Пицца - ?'
		},
		{
			name: 'Пицца 6',
			price: 2600,
			desc: 'Пицца - ?'
		},
		{
			name: 'Пицца 7',
			price: 2900,
			desc: 'Пицца - ?'
		},
		{
			name: 'Пицца 8',
			price: 3000,
			desc: 'Пицца - ?'
		},
		{
			name: 'Пицца 9',
			price: 3500,
			desc: 'Пицца - ?'
		},
		{
			name: 'Пицца 10',
			price: 3200,
			desc: 'Пицца - ?'
		},

	];

	vm.addToCart = basket.addToCart;
}