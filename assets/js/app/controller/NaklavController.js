(function() {
  'use strict';

  angular.module('app').controller('NaklavController', NaklavController);
  NaklavController.$inject = ["$scope", "$rootScope", "$mdDialog", "Naklavs", "Sklad"];

  function NaklavController($scope, $rootScope, $mdDialog, Naklavs, Sklad) {

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
      $scope.promise = Naklavs.list.get(query || $scope.query, success).$promise;
    }

    function success(records) {

      records.data.forEach(function(item){
        var suma = 0;
        item.naim.forEach(function(it){
          suma += (it.kolvo * it.price);
        });
        item.suma = suma;

        if (typeof(item.balance) != "undefined") {
          var oplat = 0;
          item.balance.forEach(function(iy){
            oplat += Number(iy.suma);
          });
          item.ostatok = item.suma - oplat;
        }else{
          item.ostatok = item.suma;
        }


      })

      $scope.naklavs = records;
    }
    getDesserts();

    $scope.add = function(ev) {
      $rootScope.kek = {
        "id": '',
        "date": '',
      }
      $mdDialog.show({
        controller: 'NaklavDialogController',
        templateUrl: 'view/naklav_dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false
      }).then(getDesserts);
    };


        $scope.add_opl = function(id, ev) {
          $rootScope.kok = id;
          $mdDialog.show({
            controller: 'NaklavOplDialogController',
            templateUrl: 'view/naklav_opl_dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false
          }).then(getDesserts);
        };


    $scope.update = function(ka, ev) {
      $rootScope.kek = ka;
      $mdDialog.show({
        controller: 'NaklavDialogController',
        templateUrl: 'view/naklav_dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false
      }).then(getDesserts);
    };

    $scope.nakladnaya = function(ka, ev) {
      $rootScope.kek = ka;
      $mdDialog.show({
        controller: 'NaklavDialogController',
        templateUrl: 'view/nakladnaya_dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false
      }).then(getDesserts);
    }


    $scope.delete = function(it, ev) {
      var order = new Naklavs.in(it);
      var confirm = $mdDialog.confirm()
        .title('Вы действительно хотите удалить эту накладную?')
        .textContent('Это действите не может быть отменено')
        .ariaLabel('Удалить')
        .targetEvent(ev)
        .ok('Да')
        .cancel('Нет');
      $mdDialog.show(confirm).then(function() {
        order.$remove().then(function() {
          order.naim.forEach(function(naim){
            var nai = new Sklad.in(naim);
            nai.$remove().then();
          });
          getDesserts();
        });
      });
    };

  }

})();
