angular.module("candidateManager").controller('interviewCtrl', ['$scope', 'InterviewSrvc', function($scope, InterviewSrvc){

	var reg = new RegExp("\\d+","g");


	InterviewSrvc.getdata({}, function(data){
		$scope.interviews = data;

		for (i in $scope.interviews.GetInterviewsListResult){
			if($scope.interviews.GetInterviewsListResult[i].IntDate != undefined) {
				var numbers = $scope.interviews.GetInterviewsListResult[i].IntDate.match(reg);
				$scope.interviews.GetInterviewsListResult[i].IntDate = "";
				$scope.interviews.GetInterviewsListResult[i].IntDate = parseInt(numbers[0]);
				$scope.interviews.GetInterviewsListResult[i].IntDate = new Date($scope.interviews.GetInterviewsListResult[i].IntDate);				
			}

		}
		$scope.sorter='IntDate';
			
  			$scope.currentPage = 0;
    		$scope.pageSize = 5;
    		$scope.numberOfPages=function(){
        		return Math.ceil($scope.interviews.GetInterviewsListResult.length/$scope.pageSize);                
    		}

	});

	}]).filter('startFrom', function() {
		
			return function(input, start) {
	if(input!=undefined){
		 start = parseInt(start);
    return input.slice(start);
	}	
        
  };
    }
).controller('addInterviewCtrl', ['$scope', 'AddInterviewSrvc','SelectedCandidates', '$location', function($scope, AddInterviewSrvc, SelectedCandidates, $location){

//$("#sel").prop('selectedIndex', -1);
//$( "#datepicker" ).datepicker( { buttonImage: "/images/date_picker.gif",autoSize: true,  showOn: "button", showAnim: "fold"});
	
$scope.newinterview={};
$scope.datetime={};

$scope.candidatesChosen=SelectedCandidates.retrieveCandidates();

$scope.jobops=[{"value":1, "text":"Ninja Experienced Developer"}, {"value":2, "text":"Ninja Experienced Developer"}, {"value":4, "text":"Test Engineer"}];

$scope.datetime.hour=12;
$scope.datetime.minute=30;
$scope.datetime.moment="AM";
$scope.newinterview.IntCandidate="";

for(var i=0;i<$scope.candidatesChosen.length;i++){
			if(i<$scope.candidatesChosen.length-1){
				$scope.newinterview.IntCandidate+=$scope.candidatesChosen[i].Can.CandidateId+";";
			}			
			else $scope.newinterview.IntCandidate+=$scope.candidatesChosen[i].Can.CandidateId;
		}

	$scope.addinterview = function(){
		// var newcandidatetoadd=JSON.stringify($scope.newcandidate);
		$scope.newinterview.IntDate=$scope.datetime.date+" "+$scope.datetime.hour+":"+$scope.datetime.minute+":00 "+$scope.datetime.moment;
		
		$scope.stringified=JSON.stringify($scope.newinterview);
		console.log($scope.stringified);
		AddInterviewSrvc.addinterview({}, $scope.stringified, function(){
			SelectedCandidates.setCandsToNull();
			alert("Interview by "+ $scope.newinterview.IntDate +" has been added");
			$location.url("Interviews", "addinterview")
		}, function(){
			alert("Failed to add interview, contact Sys Admin");
		});
		
	};

	$scope.cancel = function(){
			SelectedCandidates.setCandsToNull();
			$location.url("Interviews", "addinterview")
		
	};

	$scope.chooseCandidates=function(){
		SelectedCandidates.setCandsToNull();
		$location.url("addinterviewcandidate", "addinterview")
	};
	
}]).directive('interview', function(){
	// Runs during compile
	return {
		 restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		template:'<div class="interview">'+
		'<span class="dateFormat">{{i.IntDate|date:"medium"}}</span>'+
		'<span class="interBody">{{i.IntCandidate}}<span class="intType">{{i.InterviewType}} interview for {{i.IntJobOpening}}, {{i.IntClient}}</span>'+
		'<span class="candiInfo">{{i.CandidatePhone}} <span>{{i.CandidateEmail}}<span></span>'+
		'</span><span>Candidate Owner: {{i.Interviewer}}</span><hr id="linear">'+
        '</div>',
		 replace: true,
	};
}).controller('InterviewCandidateCtrl', ['$scope', 'InterviewCandidateSrvc','SelectedCandidates','$location', function($scope, InterviewCandidateSrvc, SelectedCandidates, $location){

	var reg = new RegExp("\\d+","g");


	InterviewCandidateSrvc.getdata({}, function(data){
		$scope.candidates = data;

		for (i in $scope.candidates.GetCandidatesListResult){
			

			if($scope.candidates.GetCandidatesListResult[i].DateAdded != undefined) {
				var numbers = $scope.candidates.GetCandidatesListResult[i].DateAdded.match(reg);
				$scope.candidates.GetCandidatesListResult[i].DateAdded = "";
				$scope.candidates.GetCandidatesListResult[i].DateAdded = parseInt(numbers[0]);
				$scope.candidates.GetCandidatesListResult[i].DateAdded = new Date($scope.candidates.GetCandidatesListResult[i].DateAdded);
			}
		}

		$scope.sorter="CandidateId"
		$scope.selectedcandidates=[];

		if($scope.candidates!=undefined){
		for(var i=0; i<$scope.candidates.GetCandidatesListResult.length;i++){
			$scope.selectedcandidates[i]=false;
		}
		}
		$scope.addRemoveCandidate=function(index){
			$scope.selectedcandidates[index]=!$scope.selectedcandidates[index];
			console.log($scope.selectedcandidates);
			}
		
		$scope.showCandidatesList=function(){
			for(var i=0;i<$scope.selectedcandidates.length;i++){
				if($scope.selectedcandidates[i]==true){
					SelectedCandidates.pushCandidate({Can:$scope.candidates.GetCandidatesListResult[i]});				}

			}
			$location.url("addinterview", "addinterviewcandidate")
		}

		$scope.cancel = function(){
			SelectedCandidates.setCandsToNull();
		$location.url("addinterview", "addinterviewcandidate")
		
	};
	});

	}]);