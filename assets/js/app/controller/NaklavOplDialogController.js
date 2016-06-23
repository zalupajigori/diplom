(function(){
  'use strict';
  angular.module('app').controller('NaklavOplDialogController', NaklavOplDialogController);

  NaklavOplDialogController.$inject = ["$scope", "$rootScope", "$mdDialog", 'Naklavs'];
  function NaklavOplDialogController($scope, $rootScope, $mdDialog, Naklavs){

    $scope.nakl = {
      id: $rootScope.kok.id
    }

    $scope.oplata = {
      date:  new Date()
    };
    $scope.oplatas = $rootScope.kok.balance;
    if (typeof($rootScope.kok.balance) == "undefined") $scope.oplatas = [];

    $scope.cancel = function () {
      $mdDialog.hide();
    }
    $scope.save = function () {
      $scope.nakl.balance = $scope.oplatas;

        var opl = new Naklavs.in($scope.nakl);
        opl.$save().then(function () {
          $scope.cancel();
        },function(err){
          console.log(err);
        });
    };

    $scope.opl = function() {
      $scope.oplatas.push($scope.oplata);
      $scope.oplata = {
        date:  new Date()
      };

    }



    $scope.delete = function (opl) {
      var index = $scope.oplatas.indexOf(opl);
      $scope.oplatas.splice(index, 1);
    }
  }


})();
