app.controller('HeaderCtrl', HeaderCtrl)

HeaderCtrl.$inject = ['$http', '$scope', '$cookies', '$rootScope', '$state'];

function HeaderCtrl($http, $scope, $cookies, $rootScope, $state) {
	var vm = this;
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
				$state.go('dashboard')
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
				$state.go('home');
			})
			.error(function(err) {
				console.log(err);
			})
	}
}