(function() {
  'use strict';
  angular
  .module('starwars')
  .controller('Search', Search);

  Search.$inject = ['$routeParams', 'datafactory'];

  function Search($routeParams, datafactory) {
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
      if (vm.searchterm) {
        datafactory.search(key, vm.searchterm)
          .then(function(results) {
            vm.results = results;
          });
      }
    }
  }
})();
