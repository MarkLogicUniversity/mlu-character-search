(function() {
  'use strict';

  angular
    .module('starwars', [
      'ngRoute',
      'angularFileUpload'
    ])
    .config(config);
    //.run(run);

    config.$inject = ['$routeProvider'];
    //run.$inject = ['$rootScope'];

    // function run($rootScope) {
    //   $rootScope.$on('$routeChangeStart', function(e, curr, prev) {
    //     console.log(curr.$$route);
    //     console.log(curr.$$route.resolve);
    //     if (curr.$$route && curr.$$route.resolve && curr.$$route.controller === 'Characters') {
    //       // Show a loading message until promises are not resolved
    //       $rootScope.loadingView = true;
    //     }
    //   });
    //
    //   $rootScope.$on('$routeChangeSuccess', function(e, curr, prev) {
    //     // Hide loading message
    //     $rootScope.loadingView = false;
    //   });
    //
    // }

    //routing configuration
    function config($routeProvider) {
      $routeProvider
      .when('/', {
        templateUrl: 'partials/main'
      })
      .when('/characters', {
        templateUrl: 'partials/characters',
        controller: 'Characters',
        controllerAs: 'vm',
        resolve: {
          characters: function(datafactory) {
            return datafactory.getAllCharacters()
          }
        }
      })
      .when('/characters/add', {
        templateUrl: 'partials/add',
        controller: 'Add',
        controllerAs: 'vm'
      })
      .when('/characters/:name', {
        templateUrl: 'partials/character',
        controller: 'Character',
        controllerAs: 'vm',
        resolve: {
          character: function(datafactory, $route) {
            return datafactory.getOneCharacter($route.current.params.name);
          },
          image: function(datafactory, $route) {
            return datafactory.displayImage($route.current.params.name);
          }
        }
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
