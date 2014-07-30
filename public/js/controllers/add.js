angular.module('LeBrisouBackend.controllers', ['LeBrisouBackend.config'])
  .controller('MainCtrl', [ '$scope', '$http', 'apiUrl', function($scope, $http, apiUrl) {
  	$scope.def_ex = {};
  	$scope.insert = function($attrs) {
  		$scope.def_ex['lema'] = $attrs.lema;
  		$scope.def_ex['pos'] = $attrs.pos;
  		console.log($scope.def_ex);
  	}

  	$scope.query = function(){

  		$http.get(api_url+'/words').
      success(function(data) {
        console.log(data);
        if(data && data.result){
          $scope.entries = data.result;
        }
      });
  	}
}]);