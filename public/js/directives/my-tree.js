angular.module('LeBrisouBackend.directives', ['LeBrisouBackend.controllers'])
	.directive('definitionExampleDirective', ['$compile', 'query'
		function($compile, add){
			var i = 0;   
			return {			
				restrict: 'E',
				scope: true,
				controller: function ($scope, $element) {
					// $scope.add = function(){
					// 	var new_element = $element.clone();
					// 	new_element.attr('id', 'def-ex-'+ (++i));
					// 	var el =  $compile(new_element)( $scope );				
  			// 		$element.parent().append( el );	
					// }
				},
				link: function(scope, element, attrs){

				// 	var def, ex = null;
				// 	scope.def_ex['def_ex'] = {};
					

				// 	scope.$watch('definition', function(newValue, oldValue) {
				// 		var index = element[0].id;
    //         if (newValue && index)
    //         	def = newValue;
    //           scope.def_ex['def_ex'][index] =  { 'definition': newValue, 'example': ex };
    //       });
    //       scope.$watch('example', function(newValue, oldValue, scope) {
    //         var index = element[0].id;
    //         if (newValue && index)
    //         	ex = newValue;
    //           scope.def_ex['def_ex'][index] =  { 'definition': def, 'example': newValue };
    //       });
				// }
			} 
	}]);
