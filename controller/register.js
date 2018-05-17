
var app = angular.module('myApp', []);
app.controller('register', function ($scope, $http) {
	$scope.formModel = {};

	$scope.onSubmit = function () {
		console.log("işlem başarılı");
		console.log($scope.formModel);

		
		$http({method: 'POST', url: 'http://ppapi.ozgurbozkurt.com.tr:1923/api/user/register',data:$scope.formModel}).
        then(function(response) {
          $scope.status = response.status;
          $scope.data = response.data;
        }, function(response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
      });
    console.log($scope.d);
	
	
		
	  
	  
	  
	  
	};
});