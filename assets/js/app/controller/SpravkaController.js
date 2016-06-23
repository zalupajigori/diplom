(function(){
    'use strict';

    angular.module('app').controller('SpravkaController', SpravkaController)


    SpravkaController.$inject = ["$scope", "Items", "$mdDialog", "$rootScope"];
    function SpravkaController ($scope, Items, $mdDialog, $rootScope) {
  $scope.selected = [];

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
            $scope.promise = Items.list.get(query || $scope.query, success).$promise;
          }

          function success(records) {

            records.data.forEach(function(rec){
              if (typeof(rec.images) != 'undefined'){
                rec.images.forEach(function(img){
                  if (img.selected) rec.image = img.src;
                })
              }
            })

            $scope.items = records;

          }
          getDesserts();

           $scope.add = function (ev) {
             delete $rootScope.kek;
              $mdDialog.show({
                controller: 'SpravkaControllerDialog',
                templateUrl: 'view/sprav_ka_dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false
              }).then(getDesserts);
           };

        $scope.kokt = function(ka,ev) {
          ka.image = ka.images[0].src;
          $rootScope.kek = ka;
          $mdDialog.show({
            controller: 'SpravkaControllerDialog',
            templateUrl: 'view/kokt_dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false
          }).then(getDesserts);
        }

        $scope.delete_input = function (){
            $(this).parent().remove();
        }
        $scope.update_ka = function (ka,ev) {
          $rootScope.kek = ka;
           $mdDialog.show({
             controller: 'SpravkaControllerDialog',
             templateUrl: 'view/sprav_ka_dialog.html',
             parent: angular.element(document.body),
             targetEvent: ev,
             clickOutsideToClose: false
           }).then(getDesserts);
        };

        $scope.delete_ka = function (it, ev) {
              var order = new Items.in(it);
              var confirm = $mdDialog.confirm()
                    .title('Вы действительно хотите удалить этот ингредиент?')
                    .textContent('Это действите не может быть отменено')
                    .ariaLabel('Удалить')
                    .targetEvent(ev)
                    .ok('Да')
                    .cancel('Нет');
              $mdDialog.show(confirm).then(function() {
                order.$remove().then(function(){
                  getDesserts();
                });
              });
            };

    }




})();
