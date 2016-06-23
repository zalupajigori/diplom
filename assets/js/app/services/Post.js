(function(){
    'use strict';

    angular.module('app').factory('Post', Post);

    Post.$inject = ["$resource"];

    function Post ($resource) {
      return {
          list: $resource ('/Post/list/:id', {id: '@id'}),
          in: $resource ('/Post/:id', {id: '@id'}),
          auto: $resource ('/Post/auto')
      };
    }
})();
