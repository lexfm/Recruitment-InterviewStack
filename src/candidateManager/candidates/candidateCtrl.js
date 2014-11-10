angular.module('candidateManager')
.controller('candidateCtrl', ['$scope', 'CandidateSrvc', function($scope, CandidateSrvc){

	var reg = new RegExp("\\d+","g");


	CandidateSrvc.getdata({search:"All"}, function(data){
		$scope.candidates = data;

		for (i in $scope.candidates){
			console.log($scope.candidates[i].DateAdded);

			if($scope.candidates[i].DateAdded != undefined) {
				var numbers = $scope.candidates[i].DateAdded.match(reg);
				$scope.candidates[i].DateAdded = "";
				$scope.candidates[i].DateAdded = parseInt(numbers[0]);
				$scope.candidates[i].DateAdded = new Date($scope.candidates[i].DateAdded);
			}
		}


	});

	$scope.gosearch = function(){
		CandidateSrvc.getdata({search:$scope.search}, function(data){
			$scope.candidates = data;
		})};

		$scope.jobs = ["--Select a job opening--",".Net Developer", "BDM", "Data Architect","MTS 2 software Engineer Magento", "Native Mobile Application Engineer", "Software Engineer", "Sr. iOS Developer", "Sr. Software Engineer", "Unix Systems Admin", "Unassociated candidate"];
		$scope.status = ["All candidates","New", "Waiting-for-evaluation", "Submitted-to-client", "Approved by client", "Rejected by client","Associated", "Interview-to-be-Scheduled", "Interview in Progress"];

		$scope.sorter='CandidateId';

	}])
.controller('singlecandidateCtrl',['$scope','$routeParams', 'CandidateOneSrvc','$location','$anchorScroll', function($scope, $routeParams, CandidateOneSrvc, $location, $anchorScroll){

	CandidateOneSrvc.getcandidate({id:$routeParams.candidateid}, function(data){
		$scope.candidate=data;
		return $scope.candidate;
	});
	
	console.log($scope.candidate);

	$scope.goback = function(){
		$location.url("Candidates","1#top");
	};

	$scope.top = function(){
		$location.hash('top');
		$anchorScroll();
		// $("details").attr("open");
	};

	$scope.savecandidate = function(){
		var candidateedit=JSON.stringify($scope.candidate);
		CandidateOneSrvc.saveedit(candidateedit);
		alert("Editing Complete ");

	};

	$scope.canceledit = function(){
		if(confirm("Are you sure you want to cancel editing this candidate?")){
			$location.url("editCandidate", "")
		}
	};


}])
.controller('addcandidateCtrl', ['$scope', 'AddCandidateSrvc', '$location', function($scope, AddCandidateSrvc, $location){

	$scope.newcandidate = {};

	$scope.newcandidate.AdditionalInfo = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." ;	
	$scope.newcandidate.EmailSubject = "Gerardo Ostos TekMexico" ; /*req*/
	$scope.newcandidate.FirstName = "Roy" ; /*req*/
	$scope.newcandidate.LastName = "Delgado" ; /*req*/
	$scope.newcandidate.CandidateId = "";
	$scope.newcandidate.MainPhone = "(83)39284529" ;
	$scope.newcandidate.DetailResume = "Front-end, Back-end Software Developer" ; /*req*/
	$scope.newcandidate.DateAdded = "2014-07-19" ; /*req*/
	$scope.newcandidate.ResumeStatus = "active" ; /*req*/
	$scope.newcandidate.Mobile = "(83)30987629" ;
	$scope.newcandidate.EmailId = "rdelgado@tekmexico.com" ; /*req*/
	$scope.newcandidate.SkypeId = "r.delgado" ; 
	$scope.newcandidate.City = "Tampico" ; /*req*/
	$scope.newcandidate.State = "TAM" ; /*req*/
	$scope.newcandidate.ZipCode = "70982" ; /*req*/
	$scope.newcandidate.Experience = "+2 years implementing webpages" ; /*req*/
	$scope.newcandidate.Qualifications = "some" ; /*req*/
	$scope.newcandidate.InterviewTime = "" ;
	$scope.newcandidate.InterviewDateTime = "" ;
	$scope.newcandidate.ParsedSkills = "HTML5, CSS3, JavaScript, C#, frameworks, etc..." ; /*req*/
	$scope.newcandidate.JobTitle = "Software Developer" ;


	$scope.addcandidate = function(){
		// var newcandidatetoadd=JSON.stringify($scope.newcandidate);
		console.log($scope.newcandidate);
		AddCandidateSrvc.addcandidate({}, $scope.newcandidate, function(){
			alert("Candidate "+ $scope.newcandidate.FirstName +" "+ $scope.newcandidate.LastName +" has been added");
			$location.url("Candidates", "addcandidate")
		}, function(){
			alert("Failed to add candidate, contact Sys Admin");
		});
		
	};

	$scope.cancel = function(){
		if(confirm("Are you sure you want to cancel adding this candidate?")){
			$location.url("Candidates", "addcandidate")
		}
	};
	
}]);