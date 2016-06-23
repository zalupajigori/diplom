(function(){
    'use strict';

    angular.module('app').factory('Ingridients', Ingridients);

    Ingridients.$inject = ["$resource"];

    function Ingridients ($resource) {
        return {
            list: $resource ('/Ingridients/list/:id', {id: '@id'}),
            in: $resource ('/Ingridients/:id', {id: '@id'}),
            auto: $resource ('/Ingridients/auto')
        };
    }
})();
