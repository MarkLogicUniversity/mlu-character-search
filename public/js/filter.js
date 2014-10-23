'use strict';

/**
 * A simple filter to showcase the filters as well
 */
var app = angular.module('starwars.filter', []);
app.filter('convert', function() {
  return function(string) {
    if (string) {
        return string.toLowerCase().replace(/[ -]/g, '');
    }
  };
});

/*
simple showcase to capitalise words
*/
app.filter('capitalise', function() {
  return function(input) {
    if (input) {
      return input[0].toUpperCase() + input.slice(1);
    }
  }
});