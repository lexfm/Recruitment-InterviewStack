
/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('loginModule')
// Factory for getting user data
.factory('UsersSrvc', ['$resource', function($resource){
	return {
		data: $resource('user.json')
	};
}]);
