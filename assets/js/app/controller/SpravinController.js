(function() {
  'use strict';

  var app = angular.module('app').controller('SpravinController', SpravinController);
  SpravinController.$inject = ["$scope", "Ingridients", "$mdDialog", 'Categories', '$rootScope', "$mdEditDialog"];

  function SpravinController($scope, Ingridients, $mdDialog, Categories, $rootScope, $mdEditDialog) {

    $scope.query = {
      order: "name",
      limit: 10,
      page: 1
    };

    $scope.query1 = {
      order: "name",
      limit: 10,
      page: 1
    };

    $scope.selected = [];
    $scope.filte = [];
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
      $scope.promise = Ingridients.list.get(query || $scope.query, success).$promise;
    }

    function success(records) {

      records.data.forEach(function(rec){
        if (typeof(rec.images) != 'undefined'){
          rec.images.forEach(function(img){
            if (img.selected) rec.image = img.src;
          })
        }
      })

      $scope.ingridients = records;
    }
    getDesserts();

    $scope.reOrder1 = function(order) {
      getDesserts1(angular.extend({}, $scope.query1, {
        order: order
      }));
    }

    $scope.onPaginate1 = function(page, limit) {
      getDesserts1(angular.extend({}, $scope.query1, {
        page: page,
        limit: limit
      }));
    };

    function getDesserts1(query) {
      $scope.promise1 = Categories.list.get(query || $scope.query1, success1).$promise;
    }

    function success1(records) {
      $scope.categories = records;
    }
    getDesserts1();



    $scope.editComment = function (event, dessert) {
       event.stopPropagation(); // in case autoselect is enabled

       var editDialog = {
         modelValue: dessert.name,
         placeholder: 'Add a comment',
         ok: 'Сохранить',
         cancel: 'Отмена',
         save: function (input) {
           dessert.name = input.$modelValue;
           var cat = new Categories.in(dessert);
           cat.$save().then(function(){

           });
         },
         targetEvent: event,
         title: 'Название'
       };

       var promise = $mdEditDialog.large(editDialog);
       promise.then(function (ctrl) {
         var input = ctrl.getInput();
       });
     };


    $scope.ingri = "";
    $scope.filter = function(cat, ev) {
      console.log($scope.selected);
      $scope.query = {
        order: 'name',
        limit: 10,
        page: 1,
        category: $scope.selected
      };
      getDesserts();
    }

    $scope.add = function(ev) {
      delete $rootScope.ig;
      $mdDialog.show({
        controller: 'SpravinControllerDialog',
        templateUrl: 'view/sprav_in_dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false
      }).then(getDesserts);
    };

    $scope.add_category = function(ev) {
      $mdDialog.show({
        controller: 'CategoryControllerDialog',
        templateUrl: 'view/categoryDialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false
      }).then(getDesserts1);
    };

    $scope.del_cat = function(category, ev) {
      var order = new Categories.in(category);
      var confirm = $mdDialog.confirm()
        .title('Вы действительно хотите удалить эту категорию?')
        .textContent('Это действите не может быть отменено')
        .ariaLabel('Удалить')
        .targetEvent(ev)
        .ok('Да')
        .cancel('Нет');
      $mdDialog.show(confirm).then(function() {
        order.$remove().then(function() {
          getDesserts1();
        });
      });
    }
    $scope.delete_inri = function(it, ev) {
      var order = new Ingridients.in(it);
      var confirm = $mdDialog.confirm()
        .title('Вы действительно хотите удалить этот ингредиент?')
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

    $scope.update_item = function(ingri, ev) {
      $rootScope.ig = ingri.id;
      $mdDialog.show({
        controller: 'SpravinControllerDialog',
        templateUrl: 'view/sprav_in_dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false
      }).then(getDesserts);
    };


  }

})();
