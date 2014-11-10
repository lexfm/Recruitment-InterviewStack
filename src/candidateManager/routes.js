angular.module('candidateManager')
.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when('/Recent_Activity', {
		templateUrl: 'recentActivity/Recent_Activity.ptl.html'
		,controller: 'recentActivityCtrl'
	})
	.when('/Clients', {
		templateUrl: 'clients/Clients.ptl.html'
		,controller: 'clientCtlr'
	})
	.when('/Candidates', {
		templateUrl: 'candidates/Candidates.ptl.html'
		,controller: 'candidateCtrl'
	})
	.when('/Candidates/:candidateid',{
		templateUrl: 'candidates/dummy.ptl.html'
		,controller: 'singlecandidateCtrl'
	})
	.when('/coming_soon', {
		templateUrl: 'coming_soon.ptl.html'
	})
	.when('/Users/', {
		templateUrl: 'users/users.ptl.html'
		,controller: 'usersCtrl'
	})
	.when('/addUser', {
		templateUrl: 'users/addUsers.ptl.html'
		,controller: 'usersCtrl'
	})
	.when('/addcandidate', {
		templateUrl: 'candidates/addCandidate.ptl.html'
		,controller: 'addcandidateCtrl'
	})
	.when('/addclient', {
		templateUrl: 'clients/addclient.ptl.html'
		,controller: 'clientCtlr'
	})
	.when('/Candidates/:candidateid/editCandidate',{
		templateUrl: 'candidates/editcandidate.ptl.html'
		,controller: 'singlecandidateCtrl'
	})	
	.when('/Interviews',{
		templateUrl: 'interviews/Interviews.ptl.html'
		,controller: 'interviewCtrl'
	})	
	.when('/addinterview',{
		templateUrl: 'interviews/addinterview.ptl.html'
		,controller: 'addInterviewCtrl'
	})
	.when('/addinterviewcandidate',{
		templateUrl: 'interviews/InterviewCandidates.ptl.html'
		,controller: 'InterviewCandidateCtrl'
	})
	.otherwise({
		redirectTo:'/Candidates'
	});
}]);