var app = angular.module('myApp', ["ngResource","ngRoute","ngCookies"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "view/main.html",
    }).when('/logout', {
		resolve: {
			deadResolve: function($location, user) {
				user.clearData();
				$location.path('/');
			}
		}
	})
    .when("/register", {
        templateUrl : "view/register.html",
        controller : "register"
    }).when("/forgotpassword", {
        templateUrl : "view/forgotPassword.html",
        controller : "ForgotPasswordController"
    })
	.when("/login", {
        templateUrl : "view/login.html",
        controller : "login"
    }).when("/confirmation/:confirmToken",{
	templateUrl: "view/confirmation.html",
	controller:"ConfirmationController"
	}).when("/profil/",{
		resolve:{
		check: function($location,user){
			if(!user.isUserLoggedIn()){
				$location.path('/login');
			}
		}},
	templateUrl: "view/profil.html",
	controller:"profil"
	})
	.when("/reset/:resetToken",{
	templateUrl: "view/resetPassword.html",
	controller:"ResetPasswordController"
	});
	
	
});
app.controller('register', function ($scope, $http) {
	if($scope.formModel.username.length==0){alert("kullanıcı adı boş");}
	$scope.formModel = {};

	$scope.onSubmit = function () {
		console.log("işlem başarılı");
		console.log($scope.formModel);
		

		
		$http({method: 'POST', url: 'http://ppapi.ozgurbozkurt.com.tr:1923/api/user/register',data:$scope.formModel}).
        then(function(response) {
			$scope.goster=true;
          $scope.status = response.status;
          $scope.data = response.data;
        }, function(response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
      });
    console.log($scope.d);
	
	
		
	  
	  
	  
	  
	};
});
app.controller('login', function ($scope,$rootScope, $resource, $http, $httpParamSerializer, $cookies,$location,user) {
	
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
			if(response.status==200){ user.saveData(response.data);$location.path('/');}else{alert('invalid token');}
			
			$rootScope.access_token=response.data.access_token;
			console.log($rootScope.access_token);
			//$http.defaults.headers.common.Authorization = 
             // 'Bearer ' + response.data.access_token;
            //$cookies.put("access_token", response.data.access_token);
            //window.location.href="index";
			console.log("access token:"+response.data.access_token);
			//$location.path('/profil/'+response.data.access_token);
		}).catch(function(response) {
		  //console.error('Error occurred:', response.status, response.data);
		}).finally(function() {
			 console.log("Task Finished.");
		});
		
		
		
		
		
		
		
		
		
		
   }    
});
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
app.controller('profil', function($scope, $http,user) {
	
	var token=user.getToken();
	$http.get("http://ppapi.ozgurbozkurt.com.tr:1923/api/user/me?access_token="+token).then(function(response) {
        $scope.myData = response.data;
		$scope.onSubmit = function () {
		console.log("işlem başarılı");
		console.log($scope.formModel);

		
		$http({method: 'POST', url: 'http://ppapi.ozgurbozkurt.com.tr:1923/api/user/update?access_token='+token,data:$scope.formModel}).
        then(function(response) {
			console.log(response.data.status)
          $scope.status = response.status;
          $scope.data = response.data;
        }, function(response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
      });
    console.log($scope.d);
	
	
		
	  
	  
	  
	  
	};
	$scope.bakiye = function () {
		console.log("işlem başarılı");
		console.log($scope.formModel);

		
		$http({method: 'POST', url: 'http://ppapi.ozgurbozkurt.com.tr:1923/api/payment/notification?access_token='+token,data:$scope.formModel}).
        then(function(response) {
			console.log(response.data.status)
          $scope.status = response.status;
          $scope.data = response.data;
        }, function(response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
      });
    console.log($scope.d);
	
	
		
	  
	  
	  
	  
	};
		
    });

    
});

app.service('user', function() {
	
	var token;
	var show=true;
	var loggedin=false;
	this.setToken=function(ktoken){
		token=ktoken;
		
	};
	this.getToken=function(){
		return token;
	};
	this.getShow=function(){
		return show;
	}
	this.isUserLoggedIn = function() {
		if(!!localStorage.getItem('login')) {
			loggedin = true;
			show= true;
			var data = JSON.parse(localStorage.getItem('login'));
			token=data.token;
		}
		return loggedin;
	};
	
	this.saveData=function(data){
		token=data.access_token;
		loggedin = true;
		show=true;
		localStorage.setItem('login', JSON.stringify({
			token: token,
		}));
	};
	this.clearData = function() {
		localStorage.removeItem('login');
		token ="";
		loggedin = false;
	}
})
	
	


	