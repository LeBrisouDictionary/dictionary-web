angular.module('LeBrisouBackend.filters', []).
  filter('toImgUrl', function ($location) {
    return function (text) {
      return '/img/'+text.toLowerCase().replace(' ', '_') + '.png';
    };
  });