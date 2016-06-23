(function() {
  'use strict';

  angular.module('app').controller('NaklavDialogController', NaklavDialogController);
  NaklavDialogController.$inject = ["$scope", "$rootScope", "$mdDialog", "Ingridients", "Post", "Sklad", "Naklavs"];

  function NaklavDialogController($scope, $rootScope, $mdDialog, Ingridients, Post, Sklad, Naklavs) {
    $scope.cancel = function() {
      $mdDialog.hide();
    }


    $scope.querySearch = function(query) {
      return Ingridients.auto.get({
        "search": query
      }).$promise.then(function(result) {
        return result.data;
      });
    }

    $scope.recalc = function(ind) {
      if (ind == null) {
        $scope.naim.forEach(function(naim) {
          naim.suma = Number(naim.amount) * Number(naim.price);
        });
      } else {
        $scope.naim[ind].suma = Number($scope.naim[ind].amount) * Number($scope.naim[ind].price);
      }
    }

    $scope.ingri_change = function(ind) {
      if ($scope.naim[ind].ingri == null) {
        $scope.naim[ind].price = "";
        return;
      }
      $scope.naim[ind].price = $scope.naim[ind].ingri.price_zak;
    }

    $scope.querySearch1 = function(query) {
      return Post.auto.get({
        "search": query
      }).$promise.then(function(result) {
        return result.data;
      });
    }

    $scope.naim = [];
    $scope.naklav = $rootScope.kek
    if ($scope.naklav.date != '') {
      $scope.naklav.date = new Date($scope.naklav.date);
    } else {
      $scope.naklav.date = new Date();
    }

    if (typeof($scope.naklav.naim) != 'undefined') {
      $scope.naklav.naim.forEach(function(item) {
        Ingridients.in.get({
          id: item.ingri
        }, function(res) {
          var igr = {
            ingri: res,
            amount: item.amount/res.size,
            price: item.price
          }
          $scope.naim.push(igr);
          $scope.recalc();
        });
      })
    } else {
      $scope.naim.push({});
    }

    $scope.add_naim = function() {
      $scope.naim.push({});
    }

    $scope.delete_input_naim = function(naim) {
      var index = $scope.naim.indexOf(naim);
      $scope.naim.splice(index, 1);
    }

    $scope.save = function() {
      if ($scope.naklav.id == '') {
        var ingri = new Naklavs.in($scope.naklav);
        ingri.$save().then(function(naklav) {
          $scope.naklav.id = naklav.id;
          saver();
        });
      } else {
        $scope.naklav.naim.forEach(function(it) {
          var rec = new Sklad.in(it);
          rec.$remove().then(function() {
            saver();
          }, function(err) {
            console.log(err);
          });
        })
      }

      /*
        var ingri = new Sklad.in($scope.naklav);
        ingri.$save().then(function (naklav) {
          $scope.cancel();
        });

        console.log($scope.naklav);

        */
    }

    function saver() {
      $scope.naklav.naim = [];
      $scope.naim.forEach(function(p) {

          if (p.ingri == null || p.price == "" || p.amount == "") {} else {
            if (p.ingri == null) {
              alert('Выберите из списка или введите валидный ингридиент');
              return;
            }
            var naim = {
              ingri: p.ingri.id,
              price: p.price,
              amount: p.amount*p.ingri.size,
              naklav: $scope.naklav.id,
              kolvo: p.amount
            }
            var nai = new Sklad.in(naim);
            nai.$save().then(function(nai) {
              $scope.naklav.naim.push(nai.id);
              if ($scope.naklav.naim.length == $scope.naim.length){
                var ingri = new Naklavs.in($scope.naklav);
                ingri.$save().then(function(naklav) {
                  $scope.cancel();
                })
              }
           });
        }
      });
    }

}


})();
