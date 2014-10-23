/**
 * This is our main AngularJS file which also defines the routes for our SPA.
 */
'use strict';
var app = angular.module('starwars', ['ngRoute', 'starwars.service', 'starwars.controller', 'starwars.filter']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/main'
        })
        .when('/characters', {
            templateUrl: 'partials/characters',
            controller: 'CharactersController',
            resolve: {
                charactersHTTPPromise: function(StarWarsService) {
                    return StarWarsService.all();
                }
            }
        })
        .when('/characters/:name', {
            templateUrl: 'partials/character',
            controller: 'CharacterController'
        })
        .when('/characters/add', {
            templateUrl: 'partials/add',
            controller: 'AddController'
        })
        .when('/search', {
            templateUrl: 'partials/search',
            controller: 'CharacterSearchController'
        })
        .otherwise({redirectTo: '/'});
}]);