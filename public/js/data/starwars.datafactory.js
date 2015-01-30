(function() {
  'use strict';
  angular
    .module('starwars')
    .factory('datafactory', datafactory);

    datafactory.$inject = ['$http'];

    function datafactory($http) {
      return {
        getAllCharacters: getAllCharacters,
        getOneCharacter: getOneCharacter,
        displayImage: displayImage,
        search: search,
        add: add
      };

      function getAllCharacters() {
        return $http
          .get('/api/characters')
          .then(complete)
          .catch(failed);
      }

      function getOneCharacter(name) {
        return $http
          .get('/api/characters/' + name)
          .then(complete)
          .catch(failed);
      }

      function displayImage(id) {
        return $http
          .get('/api/images/characters/' + id)
          .then(complete)
          .catch(failed);
      }

      function search(key, term) {
        if (key) {
          return $http
            .get('/api/search/characters/' + key + '/' + term)
            .then(complete)
            .catch(failed);
        } else {
          if (term) {
            return $http
              .get('/api/search/characters/' + term)
              .then(complete)
              .catch(failed);
          }
        }
      }

      function add(character) {
        if (character) {
          return $http.post('/api/characters/', character);
        }
      }

      // helper function to handle the resolved promise
      function complete(response) {
        return response.data;
      }

      // helper function to handle the rejected promise
      function failed(error) {
        console.error(error.statusText);
      }
    }
})();
