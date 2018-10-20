app.controller('BasketCtrl', BasketCtrl);

BasketCtrl.$inject = ['$http', '$scope', '$state', 'basket'];

function BasketCtrl($http, $scope, $state, basket) {
	var vm = this;

	// vm.basket = basket.getCart();
	// vm.delCart = basket.delCart, basket.infoCarts, basket.infoCart;
	// vm.infoCart = basket.infoCart;
	// vm.info = basket.infoCarts;
	// vm.v = "KZT";
	$http.get('api/basket')
		.success(function(response){
			vm.basket = response;
			console.log(response);
		})
		.error(function(err){
			console.log(err)
		})

    vm.deleteBasket = function(tBasket) {
        $http.delete('/api/basket/' + tBasket._id)
        .success(function(response){
            var index = vm.basket.findIndex(function(item){
                return item._id === tBasket._id;
            })
            vm.basket.splice(index, 1);
        })
        .error(function(err){
            console.log(err);
        })
    }
}