app.controller('DashboardCtrl', DashboardCtrl);

DashboardCtrl.$inject = ['$http', '$scope', '$interval','$state', '$rootScope', '$cookies'];

function DashboardCtrl($http, $scope, $interval, $state, $rootScope, $cookies) {
	var vm = this;

	if($cookies.getObject('session')) {
		$rootScope.session = $cookies.getObject('session');
		vm.rootName = [
			{
				name: $rootScope.session.name,
				email: $rootScope.session.email
			}
		];
		console.log(vm.rootName);
	}

	vm.save = function(index, comment) {
		var data = {
			name: vm.newName,
			email: vm.newEmail
		}
		$http.put('/api/save/'  + $rootScope.session._id, data)
		.success(function(response) {
			console.log(response);
		})
		.error(function(err) {
			console.log(err);
		})
	}
}
