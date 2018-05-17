var app = angular.module('myApp', ["ngResource","ngRoute","ngCookies"]);
app.controller('login', function ($scope, $resource, $http, $httpParamSerializer, $cookies) {
	$scope.formModel = {
        grant_type:"password", 
        username: "test@test.com", 
        password: "test12345"
    };
    $scope.encoded = btoa("ppuser:ppsecret");
     
	 
	 
    $scope.login = function() {   
        var req = {
            method: 'POST',
            url: "http://ppapi.ozgurbozkurt.com.tr:1923/oauth/token",
            headers: {
                "Authorization": "Basic " + $scope.encoded,
                "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
            },
            data: $httpParamSerializer($scope.formModel)
        }
        //$http(req).then(function(data){
        //    $http.defaults.headers.common.Authorization = 
         //     'Bearer ' + data.data.access_token;
         //   $cookies.put("access_token", data.data.access_token);
          //  window.location.href="index";
      //  });   
		//$http.defaults.headers.post["Content-Type"] = "text/plain";
		$http(req).then(function (response){
			$http.defaults.headers.common.Authorization = 
              'Bearer ' + response.data.access_token;
            $cookies.put("access_token", response.data.access_token);
            //window.location.href="index";
			//console.log("access token:"+response.data.access_token);
			//$location.path('/');
		}).catch(function(response) {
		  console.error('Error occurred:', response.status, response.data);
		}).finally(function() {
			 console.log("Task Finished.");
		});
		
		
		
		
		
		
		
		
		
		
   }    
});