// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var raisapp = angular.module('raisapp', ['ionic'])

raisapp.run(function($ionicPlatform,$http) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

  });

    delete $http.defaults.headers.common['X-Requested-With'];
      $http.defaults.useXDomain = true;
      $http.defaults.headers.common['Content-Type'] = "plain/text";
      $http.defaults.headers.common['Access-Control-Allow-Origin']= "*";
      $http.defaults.cache = true;




});

/*
raisapp.run(function($http){
  delete $http.defaults.headers.common['X-Requested-With'];
  $http.defaults.useXDomain = true;
  $http.defaults.headers.common['Content-Type'] = "plain/text";
  $http.defaults.headers.common['Access-Control-Allow-Origin']= "*";
  $http.defaults.cache = true;
  })
*/

raisapp.factory('User',function(){
 users = {};
 users.appt_id = '';
 return users;
});

raisapp.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

raisapp.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
   $urlRouterProvider.otherwise('/home')
   $stateProvider
   .state('home',{
    url: '/home',
    templateUrl: 'templates/sign-in.html',
    controller:'homeCtrl'
   })
   .state('somestate',{
      url:'/somestate',
      template:'<p>testing here</p>'
   })
   .state('userverify',{
     url:'/userverify',
     templateUrl:'templates/login.html',
     controller:'homeCtrl1'
   })

  }
 ]);

raisapp.controller('homeCtrl',function($scope,$http,$state,User){
    $scope.user = User;
   $scope.changeAction = function(first){
    $state.go('userverify')
   }
 }
);

raisapp.controller('homeCtrl1',function($scope,$http,$state,User){
   $scope.user = User;
   }
);

raisapp.controller('someCtrl',function($scope,$http){
		  $scope.retreive_app_data = function(){
		  $scope.logindata = "sample"
		  delete $http.defaults.headers.common['X-Requested-With'];

		    $http({
			  method: 'POST',
			  url:'http://supreethsystems.duckdns.org:8780/login',
			  data:{'appt_id':'50',
			        'mobile_number':950234343,
			        'password':'ssmer',
			        'login_ind':'y'
			        }


			/* headers:{
      			  'Content-Type':'application/json',
      				'Access-Control-Allow-Origin':'*',
      				"Access-Control-Allow-Headers": 'Origin,Content-Type, X-Requested-With'
      			  }*/

			})


			.success(function(data,status,headers,config){
			   $scope.app_data = data;
			   console.log(data);
			   $scope.message = "Successful";
         alert(data + status);

			})


			.error(function(data,status,headers,config){
			  switch(status){
                 case 401:{
				  $scope.message = "Services are down"
				  break;
				 }
				 case 500:{
				  $scope.message = "Services are down"
				  break;
				 }
			  }
                 console.log(data,status);
                 alert(data + status);
			});
		  };

		  });

