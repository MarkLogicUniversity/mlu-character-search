(function() {
  'use strict';
  
  angular
    .module('starwars', [
      'ngRoute',
      'angularFileUpload'
    ])
    .config(config);

    //routing configuration
    function config($routeProvider) {
      $routeProvider
      .when('/', {
        templateUrl: 'partials/main'
      })
      .when('/characters', {
        templateUrl: 'partials/characters',
        controller: 'Characters',
        controllerAs: 'vm'
      })
      .when('/characters/add', {
        templateUrl: 'partials/add',
        controller: 'Add',
        controllerAs: 'vm'
      })
      .when('/characters/:name', {
        templateUrl: 'partials/character',
        controller: 'Character',
        controllerAs: 'vm'
      })
      .when('/search', {
        templateUrl: 'partials/search',
        controller: 'Search',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
    }
})();
