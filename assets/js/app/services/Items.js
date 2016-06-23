/**
 * Created by Николай on 05.11.15.
 */
(function(){
    'use strict';

    angular.module('app').factory('Items', Items);

    Items.$inject = ["$resource"];

    function Items ($resource) {
      return {
          list: $resource ('/Items/list/:id', {id: '@id'}),
          in: $resource ('/Items/:id', {id: '@id'}),
          auto: $resource ('/Items/auto')
      };
    }
})();
