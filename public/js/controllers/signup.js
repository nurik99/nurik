app.controller('SignUpCtrl', SignUpCtrl);

SignUpCtrl.$inject = ['$http', '$scope', 'basket', '$interval','$state', '$rootScope', '$cookies'];

function SignUpCtrl($http, $scope, basket, $interval, $state, $rootScope, $cookies) {
	var vm = this;
	
	if($cookies.getObject('session')) {
		$rootScope.session = $cookies.getObject('session');
		$state.go('home')
	}
	vm.registration = function() {
		var data = {
			name: vm.name,
			email: vm.email,
			password: vm.password
		}
		$http.post('/api/signup', data)
			.success(function(responce) {
				console.log(responce);
				alert('Ссылка отправлено на вашу почту. Подвердите почту и логинитесь !!!');
				$state.go('home')
			})
			.error(function(err) {
				console.log(err);
			})
	}
}