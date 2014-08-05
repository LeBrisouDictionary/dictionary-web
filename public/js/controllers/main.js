angular.module('LeBrisouBackend.controllers', ['LeBrisouBackend.config'])
  .controller('MainCtrl', [ '$scope', '$http', 'apiUrl', function($scope, $http, apiUrl) {
  	$http.defaults.useXDomain = true;
    $scope.def_ex = {};
  	
    $scope.insert = function($attrs) {
  		$scope.def_ex['lema'] = $attrs.lema;
  		$scope.def_ex['pos'] = $attrs.pos;
  		console.log($scope.def_ex);
  	}

  	$scope.query = function(){
      var url = apiUrl + '/words';
  		$http.get(url).
      success(function(data) {
        if(data && data.result){
          console.log(data.result);
          $scope.entries = data.result;
        }
      })
      .error(function(data, status, headers, config){
        console.log(data);
      });
  	}
  	
  	$scope.deleteWord = function(){
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
  	}

}]);