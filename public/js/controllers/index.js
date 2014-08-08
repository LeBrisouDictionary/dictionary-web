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



app.controller('addCtrl', [ '$scope', '$http', 'backendLanguages', function($scope, $http, backendLanguages) {
  	$http.defaults.useXDomain = true;
  	
    $scope.word = {
      countries: [],
      definitions : [],
      synonyms: [],
      antonyms: [],
      relatives: [],
      hyperlinks: []
    };
    
    $scope.definitionId = 0;
  	$scope.word.definitions[$scope.definitionId] =  {
			examples: [],
		};
		
		$scope.exampleIds = {};
		$scope.exampleIds[$scope.definitionId] = 0;
		
		$scope.synonymId = 0;
		$scope.word.synonyms[$scope.synonymId] = {};
		
		$scope.relativeId = 0;
		$scope.word.relatives[$scope.relativeId] = {};
		
		$scope.antonymId = 0;
		$scope.word.antonyms[$scope.antonymId] = {};
		
		$scope.hyperlinkId = 0;
		
		$scope.countryId = 0;
		$scope.word.countries[$scope.countryId] = {};
		
		$scope.getlanguages = function(){
		  console.log('getLanguages');
      backendLanguages.get.async()
        .then(function(data){
          $scope.backendLanguages = data;
        });
  	};
  	
    $scope.insert = function() {
  		alert(JSON.stringify($scope.word));
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