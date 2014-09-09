var app = angular.module('LeBrisouBackend.services', ['LeBrisouBackend.config']);

app.service('backendLanguages', [ '$http', 'apiUrl', function($http, apiUrl) {
  	console.log(apiUrl);
  	this.get = {
      async: function(){
        var url = apiUrl + '/languages';
  		  return $http.get(url)
        .then(function(response) {
           if(response.data && response.data.result){
            return response.data.result.map(function(n){
              return n.language;
            });
          }
        });
      }
  	};
  	return this;
  }]);

app.service('backendCountries', [ '$http', 'apiUrl', function($http, apiUrl) {
  	console.log(apiUrl);
  	this.get = {
      async: function(){
        var url = apiUrl + '/countries';
  		  return $http.get(url)
        .then(function(response) {
          if(response.data && response.data.result){
            return response.data.result.map(function(n){
              return n.country;
            });
          }
        });
      }
  	};
  	return this;
  }]);

  
app.service('backendWords', [ '$http', 'apiUrl', 
  function($http, apiUrl) {
  	this.get =  {
  	  async : function(){
  	    var url = apiUrl + '/words';
  	    return $http({ method: 'GET', url: url, cache: true})
          .then(function(response) {
            if(response.data && response.data.result){
              return response.data.result;
            }
          });
  	  }
    };
    
    this.put =  {
  	  async : function(data){
  	    var url = apiUrl;
  	    return $http({ method: 'PUT', url: url, data: data, timeout: 5000 })
          .then(function(response) {
            console.log(response);
            if(response.data && response.data.result){
              return response.data;
            }
          });
  	  }
    };
    
    return this;
  }]);