
app.controller('ResetPasswordController', function ($scope, $http, $routeParams) {
	
	 $scope.resetToken = $routeParams.resetToken;
	
	
	
	
     $scope.formModel = {
        password: ""
    };
     
    $scope.resetpassword = function() {   
        var req = {
            method: 'POST',
            url: "http://ppapi.ozgurbozkurt.com.tr:1923/api/user/reset/"+$scope.resetToken,
            headers: {
                "Content-type": "application/json"
            },
            data: $scope.formModel
        }
		$http(req).then(function (response){
			alert("Şifreniz sıfırlandı!");
		}).catch(function(response) {
		 alert(response.data.data.detail);
		}).finally(function() {
			 console.log("Task Finished.");
		});
		
		
		
   }    
	   
});