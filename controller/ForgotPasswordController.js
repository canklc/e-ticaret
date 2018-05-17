
app.controller('ForgotPasswordController', function ($scope, $http) {
	
     $scope.formModel = {
        username: ""
    };
     
    $scope.forgotpassword = function() {   
        var req = {
            method: 'POST',
            url: "http://ppapi.ozgurbozkurt.com.tr:1923/api/user/reset",
            headers: {
                "Content-type": "application/json"
            },
            data: $scope.formModel
        }
		$http(req).then(function (response){
			alert("E-postanızı kontrol edin!");
		}).catch(function(response) {
		 alert(response.data.data.detail);
		}).finally(function() {
			 console.log("Task Finished.");
		});
		
		
		
   }    
	   
});