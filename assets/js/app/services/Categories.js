(function(){
    'use strict';

    angular.module('app').factory('Categories', Categories);

    Categories.$inject = ["$resource"];

    function Categories ($resource) {
      return {
          list: $resource ('/Categories/list/:id', {id: '@id'}),
          in: $resource ('/Categories/:id', {id: '@id'}),
          auto: $resource ('/Categories/auto')
      };
    }
})();
