(function(){
    'use strict';

    angular.module('app').factory('Sklad', Sklad);

    Sklad.$inject = ["$resource"];

    function Sklad ($resource) {
      return {
          list: $resource ('/Sklads/list/:id', {id: '@id'}),
          in: $resource ('/Sklads/:id', {id: '@id'}),
          ostat: $resource ('/Sklads/ostat/:id', {id: '@id'})
      };
    }
})();
