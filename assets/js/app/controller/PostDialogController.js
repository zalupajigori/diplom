(function(){
  'use strict';
  angular.module('app').controller('PostDialogController', PostDialogController);

  PostDialogController.$inject = ["$scope", "$rootScope", "$mdDialog", 'Post'];
  function PostDialogController($scope, $rootScope, $mdDialog, Post){
    $scope.cancel = function () {
      $mdDialog.hide();
    }

    $scope.save = function () {
        var post = new Post.in($scope.post);
        post.$save().then(function () {
          $scope.cancel();
        },function(err){
          console.log(err);
        });
    };



  }


})();
