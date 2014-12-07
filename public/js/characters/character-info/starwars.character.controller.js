(function() {
  'use strict';
  angular
  .module('starwars')
  .controller('Character', Character);

  Character.$inject = ['$routeParams', 'datafactory', 'debugfactory'];

  function Character($routeParams, datafactory, debugfactory) {
    var vm = this;
    var name = $routeParams.name;
    vm.character = [];

    datafactory.getOneCharacter(name)
      .then(function(data) {
        datafactory.displayImage(name)
          .then(function(imagedata) {
              data.image = imagedata[0];
              vm.character = data;
          });
    });

    vm.debug = debugfactory;
  }
})();
