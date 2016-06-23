(function() {
  'use strict';

  var app = angular.module('app').controller('DolgController', DolgController);
  DolgController.$inject = ["$scope", "Dolg", "$mdDialog", '$rootScope'];

  function DolgController($scope, Dolg, $mdDialog, $rootScope) {

    $scope.query = {
      order: "name",
      limit: 10,
      page: 1
    };

    $scope.reOrder = function(order) {
      getDesserts(angular.extend({}, $scope.query, {
        order: order
      }));
    }

    $scope.onPaginate = function(page, limit) {
      getDesserts(angular.extend({}, $scope.query, {
        page: page,
        limit: limit
      }));
    };

    function getDesserts(query) {
      $scope.promise = Dolg.list.get(query || $scope.query, success).$promise;
    }

    function success(records) {
      $scope.dolgs = records;
    }
    getDesserts();

    $scope.ingri = "";

$scope.add = function(ev) {
      $rootScope.ig = {};
      $mdDialog.show({
        controller: 'DolgDialogController',
        templateUrl: 'view/dolg_dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false
      }).then(getDesserts);
    };

    $scope.delete = function(it, ev) {
      var order = new Dolg.in(it);
      var confirm = $mdDialog.confirm()
        .title('Вы действительно хотите удалить этого должника?')
        .textContent('Это действите не может быть отменено')
        .ariaLabel('Удалить')
        .targetEvent(ev)
        .ok('Да')
        .cancel('Нет');
      $mdDialog.show(confirm).then(function() {
        order.$remove().then(function() {
          getDesserts();
        });
      });
    };


    $scope.cancel = function() {
      $mdDialog.hide();
    }


    $scope.querySearch = function(query) {
      return Dolg.auto.get({
        "search": query
      }).$promise.then(function(result) {
        return result.data;
      });
    }



  }

})();
