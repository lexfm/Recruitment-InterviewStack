angular.module('candidateManager')
.factory('UserSrvc', ['$resource', function($resource){
	return {
	data: $resource('users/users.json')
	};
}])