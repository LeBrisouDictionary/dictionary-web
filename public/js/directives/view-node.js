

angular.module('LeBrisouBackend.directives', [])
	.directive('viewNode', [ '$compile', function($compile){
		var internals = {}

		internals.table = function(e){
			var table = d3.select(e)
						.append('table')
						.attr('class', 'cl-lg-6 table table-responsive table-bordered table-hover top20'),
        	thead = table.append('thead').attr('ng-hide', '$index'),
        	tbody = table.append('tbody')
        
       thead.append('tr')
       	.selectAll('th')
        .data(['#', 'Id', 'Lema', 'Pos', 'gerund', 'participle', 'Language', 'Delete' ])
        .enter()
        .append('th')
        .attr('class', 'entry')
        .text(function(entry){ return entry; });

      return table
		}


		return {			
			restrict: 'A',
			link: function(scope, element, attrs){
        
        var table = internals.table(element[0])
       	



        element.removeAttr("view-node");
      	$compile(element)(scope);
	        
      }
		} 
	}
]);