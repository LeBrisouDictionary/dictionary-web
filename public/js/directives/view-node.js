angular.module('LeBrisouBackend.directives', [])
  .directive('viewNode', ['$compile',
    function ($compile) {

      var internals = {};

      // internals.table = function(e){
      //     var table = d3.select(e)
      //         .append('table')
      //         .attr('class', 'cl-lg-6 table table-responsive table-bordered table-hover top20'),
      //         thead = table.append('thead').attr('ng-hide', '$index'),
      //         tbody = table.append('tbody');

      //     thead.append('tr')
      //     .selectAll('th')
      //     .data(['#', 'Id', 'Lema', 'Pos', 'gerund', 'participle', 'Language', 'Delete' ])
      //     .enter()
      //     .append('th')
      //     .attr('class', 'entry')
      //     .text(function(entry){ return entry; });

      //     return tbody;
      // }
      internals.word = ['id', 'lema', 'gerund', 'participle', 'language', 'register']
      internals.addRow = function (attach) {

        attach.each(function (entry) {
          var colnames,
            key,
            value,
            table = d3.select(this);

          if (entry instanceof Object) {
            entry = [entry]
          }

          colnames = entry // array of objects
          .reduce(function (p, c) {
            return p.concat(d3.keys(c));
          }, []) // array with all keynames
          .reduce(function (p, c) {
            return (p.set(c, 0), p);
          }, d3.map()) // map with unique keynames as keys
          .keys();

          var f_colnames = colnames.filter(function (d) {
            if (internals.word.indexOf(d) != -1) return d;
          })

          // TITLES
          console.log(colnames)
          key = table.append("div")
            .attr('class', 't')
            .selectAll("div")
            .data(f_colnames)
            .enter().append("div").attr('class', 'key')
            .text(function (e) {
              return e;
            });

          // BODY
          value = table.append('div').attr('class', 't').selectAll('div')
            .data(function (e) {
              return f_colnames.map(function (k) {
                if (e[k] instanceOf Object) {
                  return
                }
                console.log('ZZZZZZZ', k, e);
                return e[k] || "";
              });
            })
            .enter().append('div').attr('class', 'key')


          // Object.keys(d)[0][

          // value.filter(function(d){
          //     return (d instanceof Object) ? Object.keys(d)[0] : false
          // });

          value.filter(function (d) {
            return (!(d instanceof Array) && !(d instanceof Object));
          })
            .text(function (d) {
              return d;
            });

          value.filter(function (d) {
            return ((d instanceof Array) || (d instanceof Object));
          })
            .append("table")
            .attr('class', 'subtable')
            .call(internals.addRow);
        });
      }


      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          console.log(scope.entries);

          d3.select(element[0])
            .append('div').selectAll('div')
            .data(scope.entries)
            .enter().append('div').attr(
              'class',
              'word')
            .call(internals.addRow);

          element.removeAttr("view-node");
          $compile(element)(scope);
        }
      }
    }
  ]);