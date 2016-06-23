(function(){
    'use strict';

    angular.module('app').factory('Dolg', Dolg);

    Dolg.$inject = ["$resource"];

    function Dolg ($resource) {
      return {
          list: $resource ('/Dolg/list/:id', {id: '@id'}),
          in: $resource ('/Dolg/:id', {id: '@id'}),
          auto: $resource ('/Dolg/auto')
      };
    }
})();
