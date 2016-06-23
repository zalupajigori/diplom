(function(){
  'use strict';
  angular.module('app').controller('CategoryControllerDialog', CategoryControllerDialog);

  CategoryControllerDialog.$inject = ["$scope", "$rootScope", "$mdDialog", 'Categories'];
  function CategoryControllerDialog($scope, $rootScope, $mdDialog, Categories){
    $scope.cancel = function () {
      $mdDialog.hide();
    }

    $scope.save = function () {
        var category = new Categories.in($scope.category);
        category.$save().then(function () {
          $scope.cancel();
        },function(err){
          console.log(err);
        });
    };


  }


})();
