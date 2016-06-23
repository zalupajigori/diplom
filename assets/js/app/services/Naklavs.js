(function(){
    'use strict';

    angular.module('app').factory('Naklavs', Naklavs);

    Naklavs.$inject = ["$resource"];

    function Naklavs ($resource) {
        return {
            list: $resource ('/Naklavs/list/:id', {id: '@id'}),
            in: $resource ('/Naklavs/:id', {id: '@id'}),
            auto: $resource ('/Naklavs/auto')
        };
    }
})();
