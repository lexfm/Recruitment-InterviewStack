/*
	Here we will create the factory to obtain the files from the server
*/
angular.module('candidateManager')
.factory('CandidateSrvc', ['$resource', function($resource){
	return $resource('http://192.168.1.65/RestService/RestServiceImpl.svc/json/candidates', {}, {
		'getdata': {method: 'GET', isArray: true}
	})
}])
.factory('CandidateOneSrvc', ['$resource', function($resource){
	return $resource('http://192.168.1.65/RestService/RestServiceImpl.svc/candidates/:id', {}, {
		'getcandidate': {method: 'GET', isArray:true},
		'saveedit' : {method: 'POST'}
	})
}])
.factory('AddCandidateSrvc', ['$resource', function($resource){
	return $resource('http://192.168.1.65/RestService/RestServiceImpl.svc/candidates/save', {}, {
		'addcandidate': {method: 'POST',
						headers:{'Content-Type':'application/json'}
						}
	})
}])
// http://192.168.1.75/RestService/RestServiceImpl.svc/candidates
// http://192.168.1.75/RestService/RestServiceImpl.svc/candidates
// candidates/candidates.// Busqueda de todos los candidatos: localhost/RestService/RestServiceImpl.svc/candidates?search="All"
// Busqueda de un grupo de candidatos: localhost/RestService/RestServiceImpl.svc/candidates?search="string"
// Busqueda de un candidato con una ID especifica: localhost/RestService/RestServiceImpl.svc/candidates/{id}
;