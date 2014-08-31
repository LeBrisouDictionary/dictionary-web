var app = angular.module('LeBrisouBackend.controllers', ['LeBrisouBackend.services']);

app.controller('indexCtrl', [ '$scope', '$http', 'backendWords', function($scope, $http, backendWords) {
  	$http.defaults.useXDomain = true;

  	$scope.query = function(){
      backendWords.get.async()
        .then(function(data){
          $scope.entries = data;
        });
  	};
}]);



app.controller('addCtrl', ['$scope', '$http', 'backendWords', function($scope, $http, backendWords){
  	$http.defaults.useXDomain = true;
  	
    $scope.word = {
      countries: [],
      definitions : [],
      register: true
    };
    
    $scope.definitionId = 0;
  	$scope.word.definitions[$scope.definitionId] =  {};
		
		$scope.exampleIds = {};
		$scope.exampleIds[$scope.definitionId] = 0;
		
		$scope.countryId = 0;
		$scope.word.countries[$scope.countryId] = {};
    	
    $scope.synonymId = 0;
    $scope.relativeId = 0;
    $scope.antonymId = 0;
    $scope.hyperlinkId = 0;

  	
    $scope.insert = function() {
  		backendWords.put.async($scope.word)
  		  .then(function(data){
  		    document.getElementById('backendStatus').innerHTML = "Word Inserted !";
  		  })
  		  .catch(function(err){
  		    console.log('addCtrl:41', err);
  		    document.getElementById('backendStatus').innerHTML = (err.data.statusCode || err.status) + ' ' +
  		      err.data.source + ' ' +
  		      err.data.message;
  		  });
  	};

  	
  	/*$scope.deleteWord = function(){
  	  var url = apiUrl + '/delete';
  	  $http.delete(url, {params: {id: wordId } })
  	  .success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
      })
      .error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
  	};*/

}]);



app.controller('languagesCtrl', [ '$scope', '$http', 'backendLanguages', function($scope, $http, backendLanguages) {
  	$http.defaults.useXDomain = true;

		
		$scope.getLanguages = function(){
		  console.log('getLanguages');
      backendLanguages.get.async()
        .then(function(data){
          $scope.backendLanguages = data;
        });
  	};
  	
}]);

app.controller('countriesCtrl', [ '$scope', '$http', 'backendCountries', function($scope, $http, backendCountries) {
  	$http.defaults.useXDomain = true;

		
		$scope.getCountries = function(){
		  console.log('getCountries');
      backendCountries.get.async()
        .then(function(data){
          $scope.backendCountries = data;
        });
  	};
  	
}]);
