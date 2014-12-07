(function() {
  'use strict';
  angular
    .module('starwars')
    .controller('Characters', Characters);

    Characters.$inject = ['datafactory', 'debugfactory'];

    function Characters(datafactory, debugfactory) {
      var vm = this;
      vm.search = [];
      vm.characters = [];

      vm.choices = ['name', 'role'];
      vm.option = 'name';
      vm.alliances = ['rebel', 'empire'];
      vm.order = {
        'sortedBy': 'name',
        'reverse': false
      };

      vm.reset = function() {
        vm.search = [];
      }
      // remember that data does not contain the image information
      datafactory.getAllCharacters()
      .then(function(data) {
        data.forEach(function(document) {
          var imageURL = document.content.name.toLowerCase().replace(/[ -]/g, '');
           datafactory.displayImage(imageURL)
             .then(function(imagedata) {
               document.content.image = imagedata[0];
               vm.characters.push(document.content);
             });
        })
      });

      vm.debug = debugfactory;
    }

})();
