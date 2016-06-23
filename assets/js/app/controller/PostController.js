(function() {
  'use strict';

  var app = angular.module('app').controller('PostController', PostController);
  PostController.$inject = ["$scope", "Post", "$mdDialog", '$rootScope', '$mdEditDialog'];

  function PostController($scope, Post, $mdDialog, $rootScope,$mdEditDialog) {

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
      $scope.promise = Post.list.get(query || $scope.query, success).$promise;
    }

    function success(records) {
      $scope.posts = records;
    }
    getDesserts();

    $scope.ingri = "";

$scope.add = function(ev) {
      $rootScope.ig = {};
      $mdDialog.show({
        controller: 'PostDialogController',
        templateUrl: 'view/post_dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false
      }).then(getDesserts);
    };

    $scope.delete = function(it, ev) {
      var order = new Post.in(it);
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
    $scope.editComment = function (event, dessert) {
       event.stopPropagation(); // in case autoselect is enabled

       var editDialog = {
         modelValue: dessert.name,
         placeholder: 'Add a comment',
         ok: 'Сохранить',
         cancel: 'Отмена',
         save: function (input) {
           dessert.name = input.$modelValue;
           var cat = new Post.in(dessert);
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

  }

})();
