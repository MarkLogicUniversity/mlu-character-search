(function() {
  'use strict';
  angular
  .module('starwars')
  .controller('Character', Character);

  Character.$inject = ['$routeParams', 'character', 'image'];

  function Character($routeParams, character, image) {
    var vm = this;
    var name = $routeParams.name;
    vm.character = [];
    vm.character = character[0].content;
    vm.character.image = image;
  }
})();
