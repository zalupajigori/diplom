(function(){
    'use strict';

    angular.module('app').controller('MenuController', MenuController);
    MenuController.$inject = ["$scope"];



    function MenuController ($scope) {

      $scope.menu = function (res) {
          $(res).slideToggle("slow");
      }
    }

})();
