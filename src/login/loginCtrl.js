
/* Controllers */

angular.module('loginModule')
// Controller for the login
  .controller('LoginCtrl', ['$scope', 'UsersSrvc', function($scope, UsersSrvc) {
  	$scope.login = function(){
  		console.log("Logging in");

  	UsersSrvc.data.get(function(data){
  		$scope.useremail = data.useremail;
  		$scope.password = data.password;
  		  console.log($scope.useremail);
  			console.log($scope.password);

            if(($scope.user_email == $scope.useremail)&&($scope.user_pass == $scope.password))
    {
      alert("This verified user " + $scope.useremail);
    }
    else {
      alert("Nope");
    }
  	});
  	};
  }]);
