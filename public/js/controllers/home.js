app.controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['$http', '$scope', 'basket', '$interval','$state', '$rootScope', '$cookies'];

function HomeCtrl($http, $scope, basket, $interval, $state, $rootScope, $cookies) {
	var vm = this;
	$http({
		method: 'GET',
		url: '/api/advall/swiper'
	}).then(function(response) {
		vm.swiper = response.data;
		console.log(vm.swiper);
	}, function(response) {
		console.log(err);
	});

    // $scope.next = function() {
    //     vm.swiper.slideNext();
    // };
    // $scope.onReadySwiper = function(swiper) {
    //     console.log('onReadySwiper');
    //     swiper.on('slideChangeStart', function() {
    //         console.log('slideChangeStart');
    //     });
    // };
	// $scope.onReadySwiper = function(swiper){
 //        swiper.initObservers();
	// };

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
	$http.get('/api/advall/')
        .success(function(response) {
            vm.advalls = response;
        })
        .error(function(err) {
            console.log(err);
        })
	vm.easy = true;
	var a = 3;

	$http({
		method: 'GET',
		url: '/api/advall?a=' + a + '/'
	}).then(function(response) {
		vm.advall = response.data;
		console.log(vm.advall);
		vm.easy = false;
	}, function(response) {
		console.log(err);
	});
	

	vm.myPagingFunction = function() {
		if(a <= vm.advalls.length + 2) {
			vm.easy = true;
  			$http({
				method: 'GET',
				url: '/api/advall?a=' + a + '/'
			}).then(function(response) {
				vm.advall = response.data;
				a += 3;
				vm.easy = false;
			}, function(response) {
				console.log(err);
			});
		}
		else {
			return vm.easy = false;
		}
	}
	vm.deletePost = function(post) {
		$http.delete('/api/advall/'+post._id)
		.success(function(response){
			var index = vm.advall.findIndex(function(item){
				return item._id === post._id;
			})
			vm.advall.splice(index, 1);
		})
		.error(function(err){
			console.log(err);
		})
	}
}