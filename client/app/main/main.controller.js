'use strict';

angular.module('beermeApp')
  .controller('MainCtrl', function ($scope, $http, Auth, $window, $location) {
    $scope.awesomeThings = [];

    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.user = Auth.getCurrentUser();

    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      $scope.$apply(function(){
        $scope.position = position;
        localStorage.lat = position.coords.latitude;
        localStorage.lon = position.coords.longitude;
      });
    });
  }

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };

    // $scope.beerFav = function() {
    //   var favs = [];
    //   angular.forEach($scope.user.beers, function(beer) {
    //     if(beer.rating >= 4.5) {
    //       favs.push(beer);
    //     }
    //   });
    //   var ranIndex = Math.floor(Math.random()*(favs.length-1));
    //   console.log(ranIndex);
    //   console.log(favs[ranIndex]);
    // };

    $scope.getMood = function() {
      $http.post('/api/users/getMood', $scope.user.tweets).success(function(moodNum) {
        if(moodNum.score >= 0.5) {
          $scope.mood = "You're super happy!  Have some champagne!!!"
        } else if(moodNum.score < 0.5 && moodNum.score > 0.2) {
          $scope.mood = "You have a nice outlook on life.  Have some nice whiskey"
        } else if(moodNum.score <= 0.2 && moodNum.score >= -0.2) {
          $scope.mood = "You're neither sad nor happy.  Have a bud, bud";
        } else if(moodNum.score > -0.5 && moodNum.score < -0.2) {
          $scope.mood = "You don't have a great outlook on life.  Have this bottle of vodka to drown your sorrows."
        } else if(moodNum.score <= -0.5) {
          $scope.mood = "You are super sad.  You probably shouldn't have a drink"
        }
        console.log($scope.mood);
      });
    };

  });
