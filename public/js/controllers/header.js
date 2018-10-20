app.controller('HeaderCtrl', HeaderCtrl)

HeaderCtrl.$inject = ['$http', '$scope', '$cookies', '$rootScope', '$state', 'basket'];

function HeaderCtrl($http, $scope, $cookies, $rootScope, $state, basket) {
	var vm = this;
	$http.get('/api/basket/')
		.success(function(response){
			vm.basket = response;
		})
		.error(function(err){
			console.log(err)
		})
	if($cookies.getObject('session')) {
		$rootScope.session = $cookies.getObject('session');
		vm.rootName = [
			{
				name: $rootScope.session.name,
				email: $rootScope.session.email
			}
		];
	}
	vm.login = function(){
		var data = {
			email: vm.lEmail,
			password: vm.lPassword
		}

		$http.post('/api/login', data)
			.success(function(response) {
				$rootScope.session = response;
				vm.rootName = [
					{
						name: $rootScope.session.name,
						email: $rootScope.session.email
					}
				];
			})
			.error(function(err) {
				console.log(err);
			})
	}

	vm.logout = function(){
		$http.post('/api/logout')
			.success(function(responce) {
				$rootScope.session = undefined;
				vm.rootName = undefined;
			})
			.error(function(err) {
				console.log(err);
			})
	}

	vm.search = function(){
		// var my_regExp = new RegExp(`^${vm.search_text}`, 'i');
		if(!vm.search_text) {
			return vm.search_result = null;
		}
		$http.get('/api/advall/search/' + vm.search_text)
			.success((response) => {
				vm.search_result = response;
				console.log(response);
			})
			.error((err) => {
				console.log(err);
			})
	}
	
}