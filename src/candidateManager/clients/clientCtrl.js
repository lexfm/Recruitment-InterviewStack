angular.module('candidateManager')
.controller('clientCtlr', ['$scope','ClientSrvc','IndustrySrvc', function($scope, ClientSrvc, IndustrySrvc){
	
		// start here
		ClientSrvc.data.get(function(data){
			$scope.clients = data.clients;
			return $scope.clients;
		});

		IndustrySrvc.data.get(function(data){
			$scope.industries = data.industries;
			console.log($scope.industries);
			return $scope.industries;
		});

}]);