(function() {
  'use strict';
  angular
    .module('starwars')
    .controller('NavigationController', NavigationController);

    NavigationController.$inject = ['$location', 'debugfactory'];

    function NavigationController($location, debugfactory) {
      var vm = this;
      vm.debug = debugfactory;
      vm.toggleDebug = function(debug) {
        debugfactory.toggleDebug(debug);
      }
      vm.isActive = function(url) {
        var path = $location.path().substring(1);
        var index = path.indexOf('/');
        if (index !== -1) {
          path = path.slice(0, index);
        }
        return url === path ? 'active' : '';
      }
    }
})();
