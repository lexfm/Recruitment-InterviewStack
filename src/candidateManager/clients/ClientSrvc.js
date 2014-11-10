/**
*  Module
*
* Description
*/
angular.module('candidateManager')
.factory('ClientSrvc', ['$resource', function($resource){
	return {
		data: $resource('clients/clients.json')
	};
}])
.factory('IndustrySrvc', ['$resource', function($resource){
	return {
		data: $resource('clients/industries.json')
	};
}])
;