var app = angular.module('LeBrisouBackend.directives', []);

app.directive('lowercase', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function($scope, $element, $attr, $ngModel) {
          $ngModel.$parsers.push(function(value) {
				    return (value || '').toLowerCase();
				  });
        }
    };
});

app.directive('backendDefinitionExample', ['$compile', function($compile){
		var initNextDefinition = function($scope){
			$scope.exampleIds[$scope.definitionId] = 0;
			$scope.definitionId++;
		};
		
		return {
			restrict: 'E',
			require: 'ngModel',
			templateUrl: '/directives/definitionExample.html',
			scope: true,
			controller: function($scope, $element){
				var _definitionId;
				$scope.addDefinition =  function(){
					console.log("addDefinition");
					if(!$scope.word.definitions[$scope.definitionId]){
						$scope.word.definitions[$scope.definitionId] = {};
					}
					_definitionId = $scope.definitionId;
					
					var new_element = '<textarea ng-model="word.definitions['+$scope.definitionId+
						'].definition" placeholder="definition" class="form-control" required lowercase></textarea>' +
						'<div id="exampleSpace_'+$scope.definitionId+'" ng-model="word.definitions['+$scope.definitionId+
						'].examples"></div>'+
						'<button type="button" ng-click="addExample()" class="btn btn-default add-def-ex col-md-3">Add Example</button>';
					var el =  $compile(new_element)( $scope );
					angular.element(document.getElementById('definitionExampleSpace')).append(el);
					
					initNextDefinition($scope);
				};
				
				
				$scope.addExample = function(){
					console.log('addExample', _definitionId);
					
					if(!$scope.word.definitions[_definitionId].examples){
						$scope.word.definitions[_definitionId].examples = [];
					}
					
					var new_element = '<textarea ng-model="word.definitions['+_definitionId+
						'].examples['+$scope.exampleIds[_definitionId]+
						']" placeholder="example" class="form-control top20 col-md-3 col-md-offset-3" lowercase></textarea>';
					
					var el =  $compile(new_element)( $scope );
					
					angular.element(document.getElementById('exampleSpace_'+_definitionId)).append(el);
					
					$scope.exampleIds[_definitionId]++;
				};
			}
		};
	}]);
	
	
app.directive('backendSynonyms', ['$compile', function($compile){
		return {
			restrict: 'E',
			templateUrl: '/directives/synonyms.html',
			scope: true,
			controller: function($scope, $element){
				$scope.addSynonym =  function(){
					console.log("addSynonym");
					
					if(!$scope.word.synonyms){
						$scope.word.synonyms = [];
					}
					
					$scope.word.synonyms[$scope.synonymId] = {};
					
					var new_element = '<input ng-model="word.synonyms['+$scope.synonymId+
						'].lema" placeholder="lema" class="form-control" lowercase></input>' +
						'<input ng-model="word.synonyms['+$scope.synonymId+
						'].pos" placeholder="pos" class="form-control" lowercase></input>';
					var el =  $compile(new_element)( $scope );
					angular.element(document.getElementById('synonymsSpace')).append(el);
					
					$scope.synonymId++;
				};
			}
		};
	}]);
	
	
app.directive('backendRelatives', ['$compile', function($compile){
		
		return {
			restrict: 'E',
			templateUrl: '/directives/relatives.html',
			scope: true,
			controller: function($scope, $element){
				$scope.addRelative =  function(){
					console.log("addRelative");
					
					if(!$scope.word.relatives){
						$scope.word.relatives = [];
					}
					$scope.word.relatives[$scope.relativeId] = {};
					
					var new_element = '<input ng-model="word.relatives['+$scope.relativeId+
						'].lema" placeholder="lema" class="form-control" lowercase></input>' +
						'<input ng-model="word.relatives['+$scope.relativeId+
						'].pos" placeholder="pos" class="form-control" lowercase></input>';
					var el =  $compile(new_element)( $scope );
					angular.element(document.getElementById('relativesSpace')).append(el);
					
					$scope.relativeId++;
				};
			}
		};
	}]);
	
	
app.directive('backendAntonyms', ['$compile', function($compile){
		
		return {
			restrict: 'E',
			templateUrl: '/directives/antonyms.html',
			scope: true,
			controller: function($scope, $element){
				$scope.addAntonym =  function(){
					console.log("addAntonym");
					
					if(!$scope.word.antonyms){
						$scope.word.antonyms = [];
					}
					$scope.word.antonyms[$scope.antonymId] = {};
					
					var new_element = '<input ng-model="word.antonyms['+$scope.antonymId+
						'].lema" placeholder="lema" class="form-control" lowercase></input>' +
						'<input ng-model="word.antonyms['+$scope.antonymId+
						'].pos" placeholder="pos" class="form-control" lowercase></input>';
					var el =  $compile(new_element)( $scope );
					angular.element(document.getElementById('antonymsSpace')).append(el);
					
					$scope.antonymId++;
				};
			}
		};
	}]);




app.directive('backendCountries', ['$compile', function($compile){
		
		return {
			restrict: 'E',
			templateUrl: '/directives/countries.html',
			scope: true,
			controller: function($scope, $element){
				$scope.addCountry =  function(){
					console.log("addCountry");
					
					$scope.word.countries[$scope.countryId] = {};
					
					var new_element = '<select ng-init="word.countries['+$scope.countryId+
						'].country = word.countries['+$scope.countryId+
						'].country || backendCountries[0]" ng-model="word.countries['+$scope.countryId+
						'].country" ng-options="countryObj for countryObj in backendCountries"></select>'+
						'<input type="number" min="0" max="100" ng-model="word.countries['+$scope.countryId+
						'].frequency" placeholder="10" class="form-control" integer></input>';
					var el =  $compile(new_element)( $scope );
					angular.element(document.getElementById('countriesSpace')).append(el);
					
					$scope.countryId++;
				};
			}
		};
	}]);


app.directive('backendHyperlinks', ['$compile', function($compile){
		
		return {
			restrict: 'E',
			templateUrl: '/directives/hyperlinks.html',
			scope: true,
			controller: function($scope, $element){
				$scope.delHyperlink = function(id){
					document.getElementById('hyperlink_'+id).remove();
					$scope.hyperlinkId--;
				};
				
				$scope.addHyperlink =  function(){
					console.log("addHyperlink");
					if(!$scope.word.hyperlinks){
						$scope.word.hyperlinks = [];
					}
					
					if(!$scope.word.hyperlinks[$scope.hyperlinkId-1].hyperlink){
						return;
					}
					
					var new_element = '<div  id="hyperlink_'+$scope.hyperlinkId+ '">' +
					'<input ng-model="word.hyperlinks['+$scope.hyperlinkId+
						']" placeholder="Hyperlink" class="form-control" lowercase></input>'+
						'<button ng-click="delHyperlink('+$scope.hyperlinkId+')" type="submit">Remove Hyperlink</button></div>';
					var el =  $compile(new_element)( $scope );
					angular.element(document.getElementById('hyperlinksSpace')).append(el);
					
					$scope.hyperlinkId++;
				};
			}
		};
	}]);
