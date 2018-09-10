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
		.state('admin', {
			url: '/admin',
			templateUrl: '/views/admin.html',
			controller: 'AdminCtrl',
			controllerAs: 'vm'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: '/views/signup.html',
			controller: 'SignUpCtrl',
			controllerAs: 'vm'
		})
		.state('support', {
			url: '/support',
			templateUrl: '/views/support.html',
			controller: 'SupportCtrl',
			controllerAs: 'vm'
		})
		.state('dashboard', {
			url: '/dashboard',
			templateUrl: '/views/dashboard.html',
			controller: 'DashboardCtrl',
			controllerAs: 'vm'
		})
}