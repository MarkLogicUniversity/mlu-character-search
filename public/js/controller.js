'use strict';
var app = angular.module('starwars.controller', []);

/**
 * This was a controller that was used by the application before, however with the 'resolve' property in the route configuration (app.js) we now have an object that we are using. Previoulsy we had to call the StarWarsService.all() function to resolve the promise.
 */
// app.controller('CharactersController', ['$scope', 'StarWarsService', 'Debug',
//     function($scope, StarWarsService, Debug) {
//         var characters = [];
//         StarWarsService.all().success(function (data) {
//             data.forEach(function (character) {
//                 characters.push(character);
//             });
//             $scope.characters = characters;
//         });
//         $scope.debug = Debug;
//     }
// ]);
// 
app.controller('CharactersController', ['$scope', 'Debug', 'charactersHTTPPromise', 'StarWarsService',
    function($scope, Debug, charactersHTTPPromise, StarWarsService) {
        $scope.search = [];
        $scope.choices = ['name', 'role'];
        $scope.option = "name";
        $scope.alliances = ['rebel', 'empire'];
        $scope.order = {sortedBy: 'name', reverse: false};
        $scope.reset = function() {
                $scope.search = [];
        }
        var characters = [];
        charactersHTTPPromise.data.forEach(function (character) {
            var imageURI = character.content.name.toLowerCase().replace(/[ -]/g, '')
            StarWarsService.displayImage(imageURI).success(function (imagedata) {
                character.content.image = imagedata[0];
                characters.push(character.content);
                $scope.characters = characters;
            });
            
        });
        $scope.debug = Debug;
    }
]);

app.controller('CharacterController', ['$scope', '$routeParams', 'StarWarsService', 'Debug',
    function($scope, $routeParams, StarWarsService, Debug) {
        var uri = $routeParams.name;
        StarWarsService.one(uri).success(function (character) {
            $scope.character = character;
            StarWarsService.displayImage(uri).success(function (imagedata) {
                $scope.character.image = imagedata[0];
            });
        });
        $scope.debug = Debug;
    }
]);

app.controller('CharacterSearchController', ['$scope', '$routeParams', 'StarWarsService', 'Debug',
    function ($scope, $routeParams, StarWarsService, Debug) {
        $scope.types = ['all', 'homeworld', 'name'];
        $scope.type = 'all';
        var key = '';
        var characters = [];
        $scope.search = function () {
            if ($scope.type === 'all') {
                key = '';
            } else {
                key = $scope.type;
            }
            StarWarsService.search(key, $scope.searchterm).success(function (results) {
                if (results.length === 0) {
                    $scope.results = [];
                    $scope.noresults = 'No results found';
                } else {
                    characters.push(results.content);
                    $scope.results = results;
                    $scope.noresults = '';
                }
            });
        };
        $scope.debug = Debug;
    }
]);

app.controller('AddController', ['$scope', '$location', 'StarWarsService', '$upload',
    function ($scope, $location, StarWarsService, $upload) {
        var file = '';
        $scope.onFileSelect = function($files) {
            for (var i = 0; i < $files.length; i++) {
              file = $files[i];
            }
        };

        $scope.add = function () {
            var character = $scope.form.add;
            StarWarsService.add(character);
            
            $scope.upload = $upload.upload({
                url: '/api/characters/image',
                data: { myObj: $scope.myModelObj },
                file: file
            }).success(function(data, status, headers, config) {
                $location.path('/characters');    
            });
        }
    }
]);

/*
controller for the menubar
it looks for the $location.path() value and applies the active CSS class if the path matches the currently visible path

There's a small trick here:
    var path = $location.path().substring(1);
    return url === path ? "active" : "";
would only match first class URLs such as /characters and /books

What about /characters/darthvader? It should still put the active class to the 'Characters' menu. If path contains / then slice the array and get the first path (==='characters') and this will set the active flag to be true
*/
app.controller('NavController', ['$scope', '$location', 'Debug',
    function($scope, $location, Debug) {
        $scope.debug = Debug;
        $scope.toggleDebug = function (debug) {
            Debug.toggleDebug(debug);
        };
        $scope.isActive = function(url) {
            var path = $location.path().substring(1);
            var index = path.indexOf('/');
            if (index !== -1) {
                path = path.slice(0, index);
            }
            return url === path ? "active" : "";
        };
    }
]);