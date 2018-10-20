app.controller('sliderSeileCtrl', sliderSeileCtrl);

sliderSeileCtrl.$inject = ['$http', '$scope', '$interval','$state', '$rootScope', '$cookies'];

function sliderSeileCtrl($http, $scope, $interval, $state, $rootScope, $cookies) {
	var vm = this;

	// if($cookies.getObject('session')) {
	// 	if ($cookies.getObject('session').name == admin) {
	// 		$cookies.getObject('session');
	// 		$rootScope.session = $cookies.getObject('session');
	// 		vm.rootName = [
	// 			{
	// 				name: $rootScope.session.name,
	// 				email: $rootScope.session.email
	// 			}
	// 		];
	// 	}
	// 	alert("Error 404");
	// }

	vm.sliderPush = function() {
		console.log(vm.file._file);
		var data = new FormData();
		data.append('title', vm.title);
		data.append('desc', vm.desc);
		data.append('link', vm.link);
		data.append('sliderFile', vm.file._file);
		console.log(data);

	   $http.post('/api/advall/slider', data, 
	     {
	       headers: {'Content-Type': undefined},
	       transformRequest: angular.identity
	     })
	   .success(function(response){
	     console.log(response);
	     alert("Добавлено в слайдер")
	     vm.sliderGet.push(response);
	   })
	   .error(function(err){
	     console.log(err);
	   })
	}

	$http({
		method: 'GET',
		url: '/api/advall/sliderGet/'
	}).then(function(response) {
		vm.sliderGet = response.data;
		console.log(vm.sliderGet);
	}, function(response) {
		console.log(err);
	});

	vm.deleteSlide = function(data) {
        $http.delete('/api/advall/deleteSlide?sl=' + data._id)
        .success(function(response){
            console.log(response);
            vm.sliderGet.splice(data, 1);
        })
        .error(function(err){
            console.log(err);
        })
    }
}