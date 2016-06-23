(function(){
    'use strict';

    angular.module('app').factory('Uploader', Uploader);

    Uploader.$inject = ["$resource"];

    function Uploader ($resource) {
      return {
          load: $resource ('/Upload/:id', {id: '@id'}),
      };
    }
})();
