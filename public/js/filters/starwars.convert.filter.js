(function() {
  'use strict';
  angular
    .module('starwars')
    .filter('convert', convert);

    function convert() {
      return function(string) {
        if (string) {
          return string.toLowerCase().replace(/[ -]/g, '');
        }
      };
    }
})();
