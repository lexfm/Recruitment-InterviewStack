angular.module('candidateManager')
.controller('recentActivityCtrl', ['$scope', 'RecentActSrvc', function($scope, RecentActSrvc){
	RecentActSrvc.data.get(function(data){
		$scope.actions = data.actions;
		return $scope.actions;
	});

	console.log($scope.actions);
}]);