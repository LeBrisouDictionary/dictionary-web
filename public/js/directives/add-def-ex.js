angular.module('LeBrisouBackend.directives', [])
	.directive('uiTree', ['$compile', function($compile){
			var i = 0;   
			return {			
				restrict: 'A',	
				templateUrl: '/directives/definition_example.html',
				require: '?ngModel',
				scope: true,
				controller: function ($scope, $element) {
					$scope.add = function(){
						var new_element = $element.clone();
						new_element.attr('id', 'def-ex-'+ (++i));
						var el =  $compile(new_element)( $scope );				
  					$element.parent().append( el );	
					}
				},
				link: function($scope, $element, attrs, controller){
					var def, ex = null;
					$scope.def_ex['def_ex'] = {};
					
					$scope.$watch('definition', function(newValue, oldValue) {
						var index = $element[0].id;
            if (newValue && index)
            	def = newValue;
              $scope.def_ex['def_ex'][index] =  { 'definition': newValue, 'example': ex };
          });
          $scope.$watch('example', function(newValue, oldValue, $scope) {
            var index = $element[0].id;
            if (newValue && index)
            	ex = newValue;
              $scope.def_ex['def_ex'][index] =  { 'definition': def, 'example': newValue };
          });
				}
			} 
	}]);
