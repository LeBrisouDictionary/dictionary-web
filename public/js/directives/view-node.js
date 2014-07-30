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
      internals.word = ['id', 'lema', 'pos', 'gerund', 'participle', 'language', 'register'];
      internals.addRow = function (attach) {

        attach.each(function (entry) {
          var colnames,
            key, s_key,
            value, s_value,
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

          // console.log(colnames)


          // FIRST LINE ===================================================
          var f_colnames = colnames.filter(function (d) {
            if (internals.word.indexOf(d) != -1) return d;
          });

          // TITLES
          key = table.append("div")
            .attr('class', 't')
            .selectAll("div")
            .data(f_colnames)
            .enter().append("div").attr('class', 'key fcol')
            .text(function (e) {
              return e;
            });

          // BODY
          value = table.append('div').attr('class', 'v').selectAll('div')
            .data(function (e) {
              return f_colnames.map(function (k) {
                if (e[k] instanceof Object) {
                  return e[k][k];
                }
                return e[k] || "";
              });
            })
            .enter().append('div').attr('class', 'value fcol');

          value.filter(function (d) {
            return (!(d instanceof Array) && !(d instanceof Object));
          })
            .text(function (d) {
              return d;
            });


          // SECOND LINE ===================================================
          var s_colnames = colnames.filter(function (d){
            if(entry[0][d] instanceof Array){
              return d;
            }
          });

          // TITLES
          s_key = table.append("div")
            .attr('class', 't')
            .selectAll("div")
            .data(s_colnames)
            .enter().append("div").attr('class', 'key scol')
            .text(function (e) {
              return e;
            });
          
          var fields = ['relatives', 'synonyms', 'antonyms'];
          
          
          var t_key = s_key.append("div")
            .attr('class', "v")
            .selectAll('div')
            .data(function(e){
              var a = entry[0][e];
              var ret = {};
              ret[e] = a;
              
              return [ret];
              
          }).enter().append('div').attr('class', 'value scol');
            
          t_key.filter(function(e){
            console.log(e);
            return ((fields.indexOf(Object.keys(e)[0])) != -1) ? true : false;
          })
          .text(function(e){
              var index = fields.indexOf(Object.keys(e)[0]);
              var c_obj_key = fields[index];
              var c_obj = e[c_obj_key][0];
              var e_keys = Object.keys(c_obj);
            
              var ret =  e_keys
                .map(function(f){
                  if (internals.word.indexOf(f) != -1){
                    return c_obj[f];
                  } 
                });
              return ret.join(' ');
            });
          

          t_key.filter(function(e){
            console.log(e);
            return ((['countries'].indexOf(Object.keys(e)[0])) != -1) ? true : false;
          })
          .text(function(e){
              var c_obj_key = "countries";
              var c_obj = e[c_obj_key][0];

              return [c_obj.id, c_obj.country, c_obj.wordCountry.frequency].join(' ');

            });  
          
          t_key.filter(function(e){
            console.log(e);
            return ((['hyperlinks'].indexOf(Object.keys(e)[0])) != -1) ? true : false;
          })
          .text(function(e){
              var c_obj_key = "hyperlinks";
              var c_obj = e[c_obj_key][0];

              return [c_obj.id, c_obj.hyperlink].join(' ');

            });
            
          t_key.filter(function(e){
            console.log(e);
            return ((['definitions'].indexOf(Object.keys(e)[0])) != -1) ? true : false;
          })
          .text(function(e){
              return "Definitions";
              // var c_obj_key = fields[index];
              // var c_obj = e[c_obj_key][0];
              // var e_keys = Object.keys(c_obj);
            
              // var ret =  e_keys
              //   .map(function(f){
              //     if (internals.word.indexOf(f) != -1){
              //       return c_obj[f];
              //     } 
              //   });

            });  
          
          // BODY
          // s_value = table.append('div').attr('class', 'v').selectAll('div')
          //   .data(function (e) {
          //     return s_colnames.map(function (k) {
          //       console.log(e[k][0])
          //       if (e[k] instanceof Object) {
          //         // console.log("---------object---------")
          //         return e[k][k];
          //       } else if (e[k] instanceof Array) {
          //         // console.log("---------array---------")
          //         return e[k]
          //       }
          //       // return e[k] || "";
          //     });
          //   })
          //   .enter().append('div').attr('class', 'value scol');

          // value.filter(function (d) {
          //   return (!(d instanceof Array) && !(d instanceof Object));
          // })
          //   .text(function (d) {
          //     return d;
          //   });

        });
      }


      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          // console.log(scope.entries);

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