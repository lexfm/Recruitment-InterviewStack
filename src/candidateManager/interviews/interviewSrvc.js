angular.module('candidateManager')
.factory('InterviewSrvc', ['$resource', function($resource){
	return $resource('http://192.168.1.69/InterviewService/InterviewService.svc/getlist', {}, {
		'getdata': {method: 'GET'}
	})
}])
.factory('AddInterviewSrvc', ['$resource', function($resource){
	return $resource('http://192.168.1.69/InterviewService/InterviewService.svc/insertjson', {}, {
		'addinterview': {method: 'POST',
						headers:{'Content-Type':'application/json'}
						}
	})
}]).factory('InterviewCandidateSrvc', ['$resource', function($resource){
	return $resource('http://192.168.1.69/InterviewService/InterviewService.svc/getcandis', {}, {
		'getdata': {method: 'GET'}
	})
}]).service('SelectedCandidates',  function(){
	var candis=[];
	return {
		pushCandidate:function(data){
			candis.push(data);
			console.log(candis);
		},
		retrieveCandidates:function(){
			return candis;
		},
		setCandsToNull: function(){
			while(candis.length > 0) {
    		candis.pop();
			}
		}
	}
});