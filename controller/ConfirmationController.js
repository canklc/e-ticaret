
app.controller('ConfirmationController', function ($scope, $http, $routeParams) {
	
     $scope.confirmToken = $routeParams.confirmToken;
       
	   
	   var req = {
            method: 'GET',
            url: "http://ppapi.ozgurbozkurt.com.tr:1923/api/user/confirmation/"+$scope.confirmToken,
            headers: {
                "Content-type": "application/json"
            }
        }
		
		$scope.Message = "";
		
		$http(req).then(function (response){
			var userinfo = response.data.data.userInformation;
			$scope.Message = userinfo.name+" "+userinfo.surname+", üyeliğiniz onaylandı!";
		}).catch(function(response) {
		  //console.error('Error occurred:', response.status, response.data);
		 
		  $scope.Message = response.data.data.detail;
		}).finally(function() {
			 console.log("Task Finished.");
		});
	   
	   
});