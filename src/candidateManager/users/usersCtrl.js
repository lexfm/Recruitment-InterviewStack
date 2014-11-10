angular.module('candidateManager')
.controller('usersCtrl', ['$scope', 'UserSrvc', '$location', function($scope, UserSrvc, $location){

	UserSrvc.data.get(function(data){
		$scope.users = data.users;
		return $scope.users;
	})

	$scope.addUser = function(){
		alert("The user has been added and saved");
		$location.url("Users/","addUser");
	};

	$scope.cancel = function(){
		if(confirm("Are your sure you want to cancel adding a user?")){
			$location.url("Users/","addUser");
		}
		else{

		}
	};
}]);