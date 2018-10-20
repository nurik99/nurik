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
	}
	vm.avatar = [];


	$http({
		method: 'GET',
		url: '/api/advall/avaGet/'
	}).then(function(response) {
		vm.avatar = response.data;
	}, function(response) {
		console.log(err);
	});

	vm.saveUser = function() {
		console.log(vm.inputName);
		var dataUser = {
			name: vm.inputName,
			password: vm.inputPassword
		};
		$http.put('/api/advall/', dataUser)
		.success(function(response) {
			$rootScope.session = response;
		})
		.error(function(err) {
			console.log(err);
		})
	}

	$http({
		method: 'GET',
		url: '/api/index/'
	}).then(function(response) {
		vm.dash = response.data;
	}, function(response) {
		console.log(err);
	});

	
	vm.editAva = function() {
		console.log(vm.file._file);
		var data = new FormData();
		data.append('avaFile', vm.file._file);
		console.log(data);

	   $http.post('/api/advall/ava', data, 
	     {
	       headers: {'Content-Type': undefined},
	       transformRequest: angular.identity
	     })
	   .success(function(response){
	     vm.avatar.push(response);
	   })
	   .error(function(err){
	     console.log(err);
	   })
	}
	vm.deleteDash = function(dash) {
        $http.delete('/api/del/' + dash._id)
        .success(function(response){
            var index = vm.dash.findIndex(function(item){
                return item._id === dash._id;
            })
            vm.dash.splice(index, 1);
        })
        .error(function(err){
            console.log(err);
        })
    }
}