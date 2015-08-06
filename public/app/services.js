'use strict';

var responseInterceptor = function(response){
	response.resource.$response = response;
	return response.resource;
};

angular.module('smartbuild.services', ['ngResource'])

.service('User', ['$resource', function($resource){
	return $resource('api/v1/user/:id', {id: '@id'}, {
		query: {method: 'GET', isArray: true, interceptor: {response: responseInterceptor}},
		update: {method: 'PUT'}
	});
}])

.service('Module', ['$resource', function($resource){
	var module = $resource('api/v1/module/:id', {id: '@id'}, {
		query: {method: 'GET', isArray: true, interceptor: {response: responseInterceptor}},
		create: {method: 'POST'},
		update: {method: 'PUT'}
	});
	
	module.prototype.$save = function(a, b, c, d){
		if(this.id){
			return this.$update(a, b, c, d);
		}
		else{
			return this.$create(a, b, c, d);
		}
	}
	
	return module;
}])

.service('Parameter', ['$resource', function($resource){
	var parameter = $resource('api/v1/parameter/:id', {id: '@id'}, {
		query: {method: 'GET', isArray: true, interceptor: {response: responseInterceptor}},
		create: {method: 'POST'},
		update: {method: 'PUT'}
	});
	
	parameter.prototype.$save = function(a, b, c, d){
		if(this.id){
			return this.$update(a, b, c, d);
		}
		else{
			return this.$create(a, b, c, d);
		}
	}
	
	return parameter;

}])

.service('Product', ['$resource', function($resource){
	var product = $resource('api/v1/product/:id', {id: '@id'}, {
		query: {method: 'GET', isArray: true, interceptor: {response: responseInterceptor}},
		create: {method: 'POST'},
		update: {method: 'PUT'}
	});
	
	product.prototype.$save = function(a, b, c, d){
		if(this.id){
			return this.$update(a, b, c, d);
		}
		else{
			return this.$create(a, b, c, d);
		}
	}
	
	return product;
}])

.service('HttpInterceptor', ['$q', '$timeout', 'Alert', function($q, $timeout, Alert) {
	
	return {
		request: function(config) {

			if(config && config.cache === undefined){
				
				config.alert = {normal: {}, slow: {}};

				config.alert.normal.timeout = $timeout(function(){
					config.alert.normal.id = Alert.add('正在加载...');
				}, 200);

				config.alert.slow.timeout = $timeout(function(){
					Alert.close(config.alert.normal.id);
					config.alert.slow.id = Alert.add('仍在继续...');
				}, 5000);
				
				return config;
			}
			
			return config || $q.when(config);
		},
		requestError: function(rejection) {
			return $q.reject(rejection);
		},
		response: function(response) {

			if(response && response.config.cache === undefined){
				$timeout.cancel(response.config.alert.normal.timeout);
				$timeout.cancel(response.config.alert.slow.timeout);
				Alert.close(response.config.alert.normal.id);
				Alert.close(response.config.alert.slow.id);
			}
			
			return response || $q.when(response);
		},
		responseError: function(rejection) {
			
			$timeout.cancel(rejection.config.alert.normal.timeout);
			$timeout.cancel(rejection.config.alert.slow.timeout);
			Alert.close(rejection.config.alert.normal.id);
			Alert.close(rejection.config.alert.slow.id);
			
			if(rejection.status > 0){
				Alert.add(rejection.statusText, 'danger', true);
			}
			
			return $q.reject(rejection);
		}
	};
}])

.service('Alert', [function(){
	
	var items = [];
		
	this.get = function(){
		return items;
	},

	this.add = function(message, type) {
		var id = new Date().getTime();
		items.push({id: id, msg: message, type: type === undefined ? 'warning' : type});
		return id;
	},

	this.close = function(id) {
		if(id === undefined){
			return;
		}
		for(var index in items){
			if (items[index].id === id){
				break;
			}
		}
		items.splice(index, 1);
	}
		
}])

.filter('plain', function(){
	return function(input, args){
		
		if(args === undefined){
			args = {};
		}
		
		if(angular.isObject(input) && !angular.isArray(input)){
			var array = [];
			for(var key in input){
				array.push(key + ': ' + input[key]);
			}
			input = array;
		}
		
		if(angular.isArray(input)){
			input = input.join(', ');
		}
		
		var output = input;
		
		if(!output && (args.placeholder === undefined || args.placeholder)){
			output = '-';
		}
		
		return output;
	}
});
