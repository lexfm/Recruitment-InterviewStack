angular.module('candidateManager')
.factory('RecentActSrvc', ['$resource', function($resource){
	return {
		data: $resource('recentActivity/recentactivity.json')
	};
}])