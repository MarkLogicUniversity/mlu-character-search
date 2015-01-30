(function() {
  'use strict';
  angular
  .module('starwars')
  .controller('Add', Add);

  Add.$inject = ['$location', '$routeParams', 'datafactory', '$upload'];

  function Add($location, $routeParams, datafactory, $upload) {
    var vm = this;
    var file = '';

    vm.onFileSelect = function($files) {
      for (var i = 0; i < $files.length; i++) {
        file = $files[i];
      }
    }

    vm.add = function() {
      var character = vm.form.add;
      datafactory.add(character);

      vm.upload = $upload.upload({
        url: '/api/characters/image',
        data: { myObj: vm.myModelObj },
        file: file
      }).success(function(data, status, headers, config) {
        $location.path('/characters');
      });
    };
  }


  })();
