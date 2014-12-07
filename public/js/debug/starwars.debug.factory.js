(function() {
  'use strict';
  angular
  .module('starwars')
  .factory('debugfactory', debugfactory);

  function debugfactory() {
    var text  = 'Debug on';
    var state = false;

    function toggleDebug(debug) {
      if (debug.state) {
        debug.text = 'Debug on';
        debug.state = !debug.state;
      } else {
        debug.state = !debug.state;
        debug.text = 'Debug off';
      }
    }

    var factory = {
      text: text,
      state: state,
      toggleDebug: toggleDebug
    };

    return factory;
  }
})();
