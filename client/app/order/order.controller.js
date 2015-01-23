'use strict';

angular.module('beermeApp')
  .controller('OrderCtrl', function ($scope, $http) {
  	var client;
  	$http.post('/api/orders/getToken', {}).success(function(token) {
  		braintree.setup(token, "custom", {id: "checkout"});
		client = new braintree.api.Client({clientToken: token});
  	}).error(function(err) {
  		console.log(err);
  	});

  	$scope.creditCard = {
      number: '',
      expirationDate: ''
    };

  	$scope.submitToDrizly = function() {
  		client.tokenizeCard({number: $scope.creditCard.number, expirationDate: $scope.creditCard.expirationDate}, function (err, nonce) {
  			console.log(nonce);
		});
  	};

  });