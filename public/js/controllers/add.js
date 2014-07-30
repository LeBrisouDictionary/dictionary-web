angular.module('LeBrisouBackend.controllers', ['LeBrisouBackend.config'])
  .controller('MainCtrl', [ '$scope', '$http', 'api_url', function($scope, $http, api_url) {
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

          var jsonData = data.result
          var results = [];
          angular.forEach(jsonData, function(key, value){
            console.log(key, value);
            results.push({ id : key.id, lema : key.lema, pos : key.pos, gerund : key.gerung, participle :key.participle });
            // results.push({ })
          });
        }
      });
  	}
}]);