(function() {
  'use strict';
  angular
    .module('starwars')
    .controller('Characters', Characters);

    Characters.$inject = ['datafactory', 'characters'];

    function Characters(datafactory, characters) {
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

      vm.characters = characters;
      // // remember that data does not contain the image information
      //   characters.forEach(function(document) {
      //
      //     var imageURL = document.content.name.toLowerCase().replace(/[ -]/g, '');
      //      datafactory.displayImage(imageURL)
      //        .then(function(imagedata) {
      //          document.content.image = imagedata;
      //          vm.characters.push(document.content);
      //        });
      //   });
    }

})();
