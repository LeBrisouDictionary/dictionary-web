angular.module('LeBrisouBackend.directives', [])
	.directive('definitionExample', ['$compile', function($compile){
		return {
			restrict: 'E',
			templateUrl: '/directives/definition_example.html',
			controller: function($scope, $element ){
				$scope.addElement = function($scope, $element){
					var new_element = $element.clone();
					var el =  $compile(new_element)( $scope );				
					$element.append( el );	
				};
			}
		};
	}])
	.directive('addDefinition', ['$compile', function($compile){
			var definition_id = 1;
			var definition_example_id = 1;
			return {
				require: '^definitionExample',
				restrict: 'A',	
				templateUrl: '/directives/definition.html',
				scope: true,
				controller: function($scope, $element){
					$scope.addDefinition = function(){
						$scope.addElement($scope, $element);
					};
				},
				link: function($scope, $element, attrs, controller){
					$scope.definition_id = definition_id++;
					$scope.definition_example_id = definition_example_id++;
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
			};
	}])
	.directive('addExample', ['$compile', function($compile){
			var example_id = 1;
			var that =  {
				require: '^definitionExample',
				restrict: 'A',	
				templateUrl: '/directives/example.html',
				controller: function($scope, $element){
					$scope.addExample = function(){
						$scope.addElement($scope, $element);
					};
				},
				scope: true,
				link: function($scope, $element, attrs, controller){
					
					$scope.example_id = example_id++;
					
					
				}
				
			};
			return that;
	}]);

