(function() {
  'use strict';

  angular.module('app').controller('SpravkaControllerDialog', SpravkaControllerDialog)


  SpravkaControllerDialog.$inject = ["$scope", "Items", "Ingridients", "$rootScope", "$mdDialog", "Upload", "$timeout"];

  function SpravkaControllerDialog($scope, Items, Ingridients, $rootScope, $mdDialog, Upload, $timeout) {
    console.log($rootScope.kek);
    if (typeof($rootScope.kek)=='undefined') {
      $scope.item = {
        images: []
      }
    }else{
      $scope.item = $rootScope.kek;
      if (typeof($scope.item.images)=="undefined") $scope.item.images = [];
    }


    $scope.recalc = function () {
      $scope.summa = 0;
      $scope.prop.forEach(function(item) {
        var pr_ml = Number(item.name.price) / item.name.size;
        $scope.summa += Number(pr_ml * item.kolvo);
      });
      $scope.summa = $scope.summa.toFixed(2);
    }

    $scope.prop = [];

    if (typeof($scope.item.ingri) != 'undefined') {
      $scope.item.ingri.forEach(function(item) {
        Ingridients.in.get({
          id: item.id
        }, function(res) {
          var igr = {
            name: res,
            kolvo: item.kolvo
          }
          $scope.prop.push(igr);
          $scope.recalc();
        });
      })
    } else {
      $scope.prop.push({});
    }

    $scope.add_prop = function() {
      $scope.prop.push({});
    }

    $scope.delete_input = function(prop) {
      var index = $scope.prop.indexOf(prop);
      $scope.prop.splice(index, 1);
    }

    $scope.cancel = function() {
      $mdDialog.hide();
    }

    $scope.save = function(ev) {
      $scope.item.ingri = [];
      $scope.prop.forEach(function(p) {
        if (p.name == "" || p.kolvo == "") {} else {
          if (p.name == null) {
            alert('Выберите из списка или введите валидный ингридиент');
            return;
          }
          var igridi = {
            id: p.name.id,
            kolvo: p.kolvo
          }
          $scope.item.ingri.push(igridi);
        }

      });
      console.log($scope.item);
      var item = new Items.in($scope.item);
      item.$save().then(function() {
        $scope.cancel();
      }, function(err) {
        console.log(err);
      });

    }

    $scope.querySearch = function(query) {
      return Ingridients.auto.get({
        "search": query
      }).$promise.then(function(result) {
        return result.data;
      });
    }
    $scope.imgselect = function(image) {
      $scope.item.images.forEach(function(img){
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
      }).then(function(ans) {
        var img = ans.data[0].fd.substr((ans.data[0].fd.indexOf("assets/")+14), ans.data[0].fd.length);
        var image = {
          src: img,
          selected: false
        }
        if (!$scope.item.images.length) image.selected = true;
          $timeout(function(){
            $scope.item.images.push(image);
          },2000);

      });
    }

  }
})();
