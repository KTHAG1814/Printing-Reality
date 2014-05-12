// Angular Backend

var Main = angular.module('Main', [
	'ngRoute',
	'ngAnimate',
	'MainControllers',
	'ui.bootstrap'
]);

Main.config(['$routeProvider',
function($routeProvider) {
	$routeProvider.
	when('/archive', {
		templateUrl: 'assets/views/model-archive.html',
		controller: 'ArchiveCtrl'
	}).
	when('/archive/:category', {
		templateUrl: 'assets/views/model-archive.html',
		controller: 'ArchiveCtrl'
	}).
	when('/archive/:category/:id', {
		templateUrl: 'assets/views/model-page.html',
		controller: 'ModelCtrl'
	}).
	when('/', {
		templateUrl: 'assets/views/start.html',
		controller: 'StartCtrl',
	}).
	when('/demo/:slide', {
		templateUrl: 'assets/views/demo.html',
		controller: 'DemoCtrl',
	}).
	when('/about', {
		templateUrl: 'assets/views/about.html',
		controller: 'AboutCtrl',
	}).
	when('/cart', {
		templateUrl: 'assets/views/cart.html',
		controller: 'CartCtrl',
	}).
	when('/study', {
		templateUrl: 'assets/views/study.html',
		controller: 'StudyCtrl',
	}).
	otherwise({
		redirectTo: '/',
		templateUrl: 'assets/views/start.html',
	});
}]);

var MainControllers = angular.module('MainControllers', []);

MainControllers.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
	$scope.template = {};
	$scope.template.footer = 'assets/partials/footer.html';
	$scope.cart = [];
}]);

MainControllers.controller('StartCtrl', ['$scope', '$http', function ($scope, $http) {
	$scope.template.context = 'start';
	$scope.template.header = '';
}]);

MainControllers.controller('DemoCtrl', ['$scope', '$http', function ($scope, $http) {
	$scope.template.context = 'demo';
	$scope.template.header = '';
}]);

MainControllers.controller('AboutCtrl', ['$scope', '$http', function ($scope, $http) {
	$scope.template.context = 'page';
	$scope.template.header = 'assets/partials/headernav.html';
}]);

MainControllers.controller('StudyCtrl', ['$scope', '$http', function ($scope, $http) {
	$scope.template.context = 'page';
	$scope.template.header = 'assets/partials/headernav.html';
}]);

MainControllers.controller('CartCtrl', ['$scope', '$http', function ($scope, $http) {
	$scope.template.context = 'page';
	$scope.template.header = 'assets/partials/headernav.html';

	$scope.removeFromCart = function(index){
		$scope.cart.splice(index, 1);	
	}
}]);

MainControllers.controller('ModelCtrl', ['$scope', '$http', '$routeParams',
function ($scope, $http, $routeParams) {
	$scope.model = [];
	$scope.template.header = 'assets/partials/headernav.html';
	$scope.template.context = 'page';
	$http.get('assets/json/models.json').success(function(data){
		$.each(data, function(index, value){
			if(data[index].id == $routeParams.id){
				$scope.model = data[index];
				$scope.breadcrumb = $scope.model;
				return false;
			}
		});
	});

	$scope.addToCart = function(orderDescription){
		var order = {'item':$scope.model, 'description':orderDescription};
		$scope.cart.push(order);	
	}

}]);

MainControllers.controller('ArchiveCtrl', ['$scope', '$http', '$routeParams', '$filter',
function ($scope, $http, $routeParams, $filter) {
	$scope.models = [];
	$scope.template.header = 'assets/partials/headernav.html';
	$scope.template.context = 'page';
	$http.get('assets/json/models.json').success(function(data){
		$scope.breadcrumb = $routeParams;
		$scope.models = data;
		$scope.models = $filter("filter")($scope.models, {category: $routeParams.category}, $routeParams.category);
	});
}]);