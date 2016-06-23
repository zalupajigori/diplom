    (function(){
      'use strict';
      angular.module('app').controller('DolgKasaDialogController', DolgKasaDialogController);

      DolgKasaDialogController.$inject = ["$scope", "$rootScope", "$mdDialog", "Dolg"];
      function DolgKasaDialogController($scope, $rootScope, $mdDialog, Dolg){
        $scope.cancel = function () {
          $mdDialog.hide();
        }


            $scope.querySearch = function(query) {
              return Dolg.auto.get({
                "search": query
              }).$promise.then(function(result) {
                return result.data;
              });
            }

            $scope.save = function () {
                var dolg = new Dolg.in($scope.post);
                post.$save().then(function () {
                  $scope.cancel();
                },function(err){
                  console.log(err);
                });
            };

      }


    })();
