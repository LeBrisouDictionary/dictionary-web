angular.module('filters', []).
  filter('toimg', function () {
    return function (text) {
      return text.toLowerCase().replace(' ', '_') + '.png';
    };
  });