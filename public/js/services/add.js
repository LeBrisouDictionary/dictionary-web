angular.module('LeBrisouBackend.controllers', ['LeBrisouBackend.config'])
  .factory('AddService', [ '$scope', function($scope) {
  	$scope.def_ex = {};
  	$scope.insert = function($attrs) {
  		$scope.def_ex['lema'] = $attrs.lema;
  		$scope.def_ex['pos'] = $attrs.pos;
  		console.log($scope.def_ex);
  	}
  }]);