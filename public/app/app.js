'use strict';

// Declare app level module which depends on views, and components
angular.module('smartbuild', [
	'ngRoute',
	'ui.bootstrap',
	'smartbuild.services',
	'smartbuild.modules',
	'smartbuild.parameters',
	'smartbuild.products',
	'smartbuild.users'
])
.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
	$routeProvider
		.when('/user', {
			controller: 'UserController',
			templateUrl: 'app/user/list.html',
			resolve: {
				users: ['$route', 'User', function($route, User){
					return User.query(angular.extend({per_page: 20}, $route.current.params)).$promise;
				}]
			}
		})
		.when('/user/:id', {
			controller: 'UserEditController',
			templateUrl: 'app/user/edit.html',
			resolve: {
				user: ['$route', 'User', function($route, User){
					return User.get({id: $route.current.params.id}).$promise;
				}]
			}
		})
		.when('/module', {
			controller: 'ModuleController',
			templateUrl: 'app/module/list.html',
			resolve: {
				modules: ['$route', 'Module', function($route, Module){
					return Module.query(angular.extend({per_page: 20}, $route.current.params)).$promise;
				}]
			}
		})
		.when('/module/:id', {
			controller: 'ModuleEditController',
			templateUrl: 'app/module/edit.html',
			resolve: {
				module: ['$route', 'Module', function($route, Module){
					if($route.current.params.id === 'new'){
						return new Module()
					}
					return Module.get({id: $route.current.params.id}).$promise;
				}]
			}
		})
		.when('/parameter', {
			controller: 'ParameterController',
			templateUrl: 'app/parameter/list.html',
			resolve: {
				parameters: ['$route', 'Parameter', function($route, Parameter){
					return Parameter.query(angular.extend({per_page: 20}, $route.current.params)).$promise;
				}]
			}
		})
		.when('/parameter/:id', {
			controller: 'ParameterEditController',
			templateUrl: 'app/parameter/edit.html',
			resolve: {
				parameter: ['$route', 'Parameter', function($route, Parameter){
					if($route.current.params.id === 'new'){
						return new Parameter()
					}
					return Parameter.get({id: $route.current.params.id}).$promise;
				}]
			}
		})
		.when('/product', {
			controller: 'ProductController',
			templateUrl: 'app/product/list.html',
			resolve: {
				products: ['$route', 'Product', function($route, Product){
					return Product.query(angular.extend({per_page: 20}, $route.current.params)).$promise;
				}]
			}
		})
		.when('/product/:id', {
			controller: 'ProductEditController',
			templateUrl: 'app/product/edit.html',
			resolve: {
				product: ['$route', 'Product', function($route, Product){
					if($route.current.params.id === 'new'){
						return new Product()
					}
					return Product.get({id: $route.current.params.id}).$promise;
				}]
			}
		})
		.otherwise({redirectTo: '/module'});

	$httpProvider.interceptors.push('HttpInterceptor');

}])

.controller('AlertCtrl', ['$scope', 'Alert',
	function($scope, Alert){
		$scope.alerts = Alert.get();
		$scope.close = Alert.close;
		$scope.previous = function(){};
		$scope.next = function(){};
		
		$scope.toggleCloseButton = function(index){
			$scope.alerts[index].closeable = !$scope.alerts[index].closeable;
		};
	}
]);

angular.module('smartbuild.modules', [])
.controller('ModuleController', ['$scope', '$location', 'modules', function($scope, $location, modules){
	$scope.modules = modules;
	$scope.currentPage = $location.search().page || 1;
	
	// get pagination argument from headers
	var headers = $scope.modules.$response.headers();
	$scope.itemsTotal = Number(headers['items-total']);
	$scope.itemsStart = Number(headers['items-start']);
	$scope.itemsEnd = Number(headers['items-end']);
	
	$scope.nextPage = function(){
		$location.search('page', ++$scope.currentPage);
	}

	$scope.previousPage = function(){
		$scope.currentPage--;
		$location.search('page', $scope.currentPage === 1 ? null : $scope.currentPage);
	}
	
	$scope.editModule = function(module){
		$location.url('module/' + module.id);
	}
	
	
}])
.controller('ModuleEditController', ['$scope', '$location', 'module', 'Alert', 'Module', function($scope, $location, module, Alert, Module){
	$scope.module = module;
	$scope.save = function(module){
		module.$save(function(){
			Alert.add('模块已更新', 'success');
		});
	}
	$scope.remove = function(module){
		module.$remove({}, function(){
			$location.url('module');
		});
	}
	$scope.searchModule = function(name){
		return Module.query({keyword: name}).$promise;
	}
}]);

angular.module('smartbuild.parameters', []).controller('ParameterController', ['$scope', '$location', 'parameters', function($scope, $location, parameters){
	$scope.parameters = parameters;
	$scope.currentPage = $location.search().page || 1;
	
	// get pagination argument from headers
	var headers = $scope.parameters.$response.headers();
	$scope.itemsTotal = Number(headers['items-total']);
	$scope.itemsStart = Number(headers['items-start']);
	$scope.itemsEnd = Number(headers['items-end']);
	
	$scope.nextPage = function(){
		$location.search('page', ++$scope.currentPage);
	}

	$scope.previousPage = function(){
		$scope.currentPage--;
		$location.search('page', $scope.currentPage === 1 ? null : $scope.currentPage);
	}
	
	$scope.editParameter = function(parameter){
		$location.url('parameter/' + parameter.id);
	}
}])
.controller('ParameterEditController', ['$scope', 'parameter', 'Alert', 'Module', 'User', 'Parameter', function($scope, parameter, Alert, Module, User, Parameter){
	$scope.parameter = parameter;
	$scope.save = function(parameter){
		parameter.$save({}, function(){
			Alert.add('参数已更新', 'success');
		});
	}
	$scope.searchModule = function(name){
		return Module.query({keyword: name}).$promise;
	}
	$scope.searchUser = function(name){
		return User.query({keyword: name, with_group: true}).$promise;
	}
	$scope.searchParameter = function(name){
		return Parameter.query({keyword: name}).$promise;
	}
}]);

angular.module('smartbuild.products', []).controller('ProductController', ['$scope', '$location', 'products', function($scope, $location, products){
	$scope.products = products;
	$scope.currentPage = $location.search().page || 1;
	
	// get pagination argument from headers
	var headers = $scope.products.$response.headers();
	$scope.itemsTotal = Number(headers['items-total']);
	$scope.itemsStart = Number(headers['items-start']);
	$scope.itemsEnd = Number(headers['items-end']);
	
	$scope.nextPage = function(){
		$location.search('page', ++$scope.currentPage);
	}

	$scope.previousPage = function(){
		$scope.currentPage--;
		$location.search('page', $scope.currentPage === 1 ? null : $scope.currentPage);
	}
	
	$scope.editProduct = function(product){
		$location.url('product/' + product.id);
	}
}])
.controller('ProductEditController', ['$scope', 'product', 'Alert', 'Module', 'User', 'Product', function($scope, product, Alert, Module, User, Product){
	$scope.product = product;
	$scope.save = function(product){
		product.$save({}, function(){
			Alert.add('产品已更新', 'success');
		});
	}
	$scope.searchModule = function(name){
		return Module.query({keyword: name}).$promise;
	}
	$scope.searchUser = function(name){
		return User.query({keyword: name, with_group: true}).$promise;
	}
	$scope.searchProduct = function(name){
		return Product.query({keyword: name}).$promise;
	}
}]);

angular.module('smartbuild.users', []).controller('UserController', ['$scope', '$location', 'users', function($scope, $location, users){
	$scope.users = users;
	$scope.currentPage = $location.search().page || 1;
	
	// get pagination argument from headers
	var headers = $scope.users.$response.headers();
	$scope.itemsTotal = Number(headers['items-total']);
	$scope.itemsStart = Number(headers['items-start']);
	$scope.itemsEnd = Number(headers['items-end']);
	
	$scope.nextPage = function(){
		$location.search('page', ++$scope.currentPage);
	}

	$scope.previousPage = function(){
		$scope.currentPage--;
		$location.search('page', $scope.currentPage === 1 ? null : $scope.currentPage);
	}
	
	$scope.editUser = function(user){
		$location.url('user/' + user.id);
	}
}])
.controller('UserEditController', ['$scope', 'user', 'Alert', function($scope, user, Alert){
	$scope.user = user;
	$scope.save = function(user){
		user.$update({}, function(){
			Alert.add('用户已更新', 'success');
		});
	}
}]);
