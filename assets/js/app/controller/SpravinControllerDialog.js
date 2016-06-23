(function() {
  'use strict';
  angular.module('app').controller('SpravinControllerDialog', SpravinControllerDialog);

  SpravinControllerDialog.$inject = ["$scope", "$rootScope", "$mdDialog", 'Ingridients', 'Categories', 'Upload', '$timeout'];

  function SpravinControllerDialog($scope, $rootScope, $mdDialog, Ingridients, Categories, Upload, $timeout) {

    //init
    $scope.categories = Categories.in.query({});

    if (typeof($rootScope.ig) != "undefined") {
      Ingridients.in.get({
        id: $rootScope.ig
      }, function(item) {
        if (typeof(item.category) != "undefined")
          Categories.in.get({
            id: item.category.id
          }, function(cat) {
            item.category = cat;
            $scope.ingridient = item;
          });
      })
    }else{
      $scope.ingridient= {
        images: []
      }
    }

    $scope.cancel = function() {
      $mdDialog.hide();
    }

    $scope.save = function() {

      if ($scope.ingridient.category == null) {
        alert('Выберите из списка категорию');
        return;
      }
      var ss = []
      $scope.ingridient.images.forEach(function(image){
        var s = {
          src: image.src,
          selected: image.selected
        }
        ss.push(s)
      })
      $scope.ingridient.images = ss;
      $scope.ingridient.category = $scope.ingridient.category.id;
      var ingri = new Ingridients.in($scope.ingridient);
      ingri.$save().then(function(newIngri) {
        $scope.cancel();
      });
    };

    $scope.querySearch = function(query) {
      return Categories.auto.get({
        "search": query
      }).$promise.then(function(result) {
        return result.data;
      });
    }

    $scope.imgselect = function(image) {
      $scope.ingridient.images.forEach(function(img){
        img.selected = false;
      })
      image.selected = true;
    }

    $scope.uploadFiles = function(files) {
      Upload.upload({
        url: '/upload',
        method: 'POST',
        fileFormDataName: 'photo',
        file: files
      }).then(function(ans, status, headers, config) {
        var img = ans.data[0].fd.substr((ans.data[0].fd.indexOf("assets/")+14), ans.data[0].fd.length);
        var image = {
          src: img,
          selected: false
        }
        if (!$scope.ingridient.images.length) image.selected = true;
          $timeout(function(){
            $scope.ingridient.images.push(image);
          },2000);

      });
    }
  }
})();
