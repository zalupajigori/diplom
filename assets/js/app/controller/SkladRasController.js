(function() {
  'use strict';

  angular.module('app').controller('SkladRasController', SkladRasController);
  SkladRasController.$inject = ["$scope", "$mdEditDialog", "$rootScope", "$mdDialog", "Sklad"];

  function SkladRasController($scope, $mdEditDialog, $rootScope, $mdDialog, Sklad) {

    $scope.query = {
      order: "-createdAt",
      limit: 10000,
      page: 1
    };

    getDesserts1();

    function getDesserts1(query) {
      $scope.promise = Sklad.list.get(query || $scope.query, success1).$promise;
    }

    function success1(records) {
      $scope.log = records;
      $scope.log.data.forEach(function(item) {
        if (typeof(item.naklav) != "undefined") {
          item.type = true;
          item.sum = "+" + item.amount;
        } else {
          item.type = false;
          item.sum = item.amount;
        }
      })
      console.log($scope.log);
    }
  }

})();
