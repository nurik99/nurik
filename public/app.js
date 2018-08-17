var app = angular.module('decode', [
	'ui.router',
	'ngCookies'
])

app.config(routeConfig);

routeConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

function routeConfig ($stateProvider, $urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/');
	
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '/views/home.html',
			controller: 'HomeCtrl',
			controllerAs: 'vm'
		})
		.state('basket', {
			url: '/basket',
			templateUrl: '/views/basket.html',
			controller: 'BasketCtrl',
			controllerAs: 'vm'
		})
}