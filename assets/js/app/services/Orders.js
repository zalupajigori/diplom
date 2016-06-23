(function(){
    'use strict';

    angular.module('app').factory('Orders', Orders);

    Orders.$inject = ["$resource"];

    function Orders ($resource) {
      return {
          list: $resource ('/Orders/list/:id', {id: '@id'}),
          in: $resource ('/Orders/:id', {id: '@id'}),
          buy: $resource ('/Orders/buy/:id', {id: '@id'}),
          pai: $resource('/Orders/pai/:id', {id: '@id'})
      };
    }
})();
