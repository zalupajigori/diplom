(function(){
  'use strict';
  angular.module('app').controller('DolgDialogController', DolgDialogController);

  DolgDialogController.$inject = ["$scope", "$rootScope", "$mdDialog", 'Dolg'];
  function DolgDialogController($scope, $rootScope, $mdDialog, Dolg){
    $scope.cancel = function () {
      $mdDialog.hide();
    }

    $scope.save = function () {
        var dolg = new Dolg.in($scope.dolg);
        dolg.$save().then(function () {
          $scope.cancel();
        },function(err){
          console.log(err);
        });
    };

    $scope.cancel = function() {
      $mdDialog.hide();
    }

  }


})();
