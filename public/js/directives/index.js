angular.module('LeBrisouBackend.directives', [])
	.directive('definitionExample', ['$compile', function($compile){
		var initNextDefinition = function($scope){
			$scope.word.definitions[$scope.definitionId] =  {
				examples: [],
			};
			$scope.exampleIds[$scope.definitionId] = 0;
			$scope.definitionId++;
		};
		
		return {
			restrict: 'E',
			templateUrl: '/directives/definition_example.html',
			scope: true,
			controller: function($scope, $element){
				var _definitionId;
				$scope.addDefinition =  function(){
					console.log("addDefinition");
					_definitionId = $scope.definitionId;
					
					var new_element = '<textarea ng-model="word.definitions['+$scope.definitionId+
						'].definition" placeholder="definition" class="form-control"></textarea>' +
						'<div id="exampleSpace_'+$scope.definitionId+'" ng-model="word.definitions['+$scope.definitionId+
						'].examples"></div>'+
						'<button type="button" ng-click="addExample()" class="btn btn-default add-def-ex col-md-3">Add Example</button>';
					var el =  $compile(new_element)( $scope );
					angular.element(document.getElementById('definitionExampleSpace')).append(el);
					
					initNextDefinition($scope);
				};
				
				
				$scope.addExample = function(){
					console.log('addExample', _definitionId);
					var new_element = '<textarea ng-model="word.definitions['+_definitionId+
						'].examples['+$scope.exampleIds[_definitionId]+
						']" placeholder="example" class="form-control top20 col-md-3 col-md-offset-3"></textarea>';
					
					var el =  $compile(new_element)( $scope );
					
					angular.element(document.getElementById('exampleSpace_'+_definitionId)).append(el);
					
					$scope.exampleIds[_definitionId]++;
				};
			}
		};
	}]);

