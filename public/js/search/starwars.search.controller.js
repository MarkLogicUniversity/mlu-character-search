(function() {
  'use strict';
  angular
  .module('starwars')
  .controller('Search', Search);

  Search.$inject = ['$routeParams', 'datafactory', 'debugfactory'];

  function Search($routeParams, datafactory, debugfactory) {
    var vm   = this;
    var name = $routeParams.name;
    var key  = '';
    vm.results = [];
    vm.types = ['all', 'homeworld', 'name'];
    vm.type = 'all';

    vm.search = function() {
      if (vm.type === 'all') {
        key = '';
      } else {
        key = vm.type;
      }

      datafactory.search(key, vm.searchterm)
        .then(function(results) {
          vm.results.push(results.content);
          vm.results = results;
        });

      vm.debug = debugfactory;
    }

    vm.debug = debugfactory;
  }
})();
