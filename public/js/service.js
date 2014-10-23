'use strict';

var app = angular.module('starwars.service', []);
app.service('StarWarsService', ['$http',
    function($http) {
        return {
            all: function () {
                return $http.get('/api/characters');
            },
            one: function (uri) {
                return $http.get('/api/characters/' + uri);
            },
            displayImage: function(id) {
                return $http.get('/api/characters/image/' + id)
            },
            search: function (key, term) {
                if (key) {
                    return $http.get('/api/characters/search/' + key + '/' + term);
                } else {
                    return $http.get('/api/characters/search/' + term);
                }
            },
            add: function (leader) {
                if (leader) {
                    return $http.post('/api/characters/', leader);
                }
            }
        }
    }
]);

app.service('Debug', function() {
    return {
        state: false,
        text: 'Debug on',
        toggleDebug: function(debug) {
            if (debug.state) {
                debug.text = 'Debug on';
                debug.state = !debug.state;
            } else {
                debug.state = !debug.state;
                debug.text = 'Debug off';
            }
        }
    }
});