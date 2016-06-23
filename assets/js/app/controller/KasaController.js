(function() {
  'use strict';

  angular.module('app').controller('KasaController', KasaController);
  KasaController.$inject = ["$scope", "Ingridients", "Items", "$mdEditDialog", "$rootScope", "$mdDialog", "Orders", "$q", "Sklad"];



  function KasaController($scope, Ingridients, Items, $mdEditDialog, $rootScope, $mdDialog, Orders, $q, Sklad) {
    $scope.query = {

    };

    $scope.query1 = {
      order: 'paid',
      limit: 10,
      page: 1
    };
    $scope.zakaz = {
      buys: []
    }

    function getDesserts1(query) {
      $scope.promise = Items.in.query(query || $scope.query, success1).$promise;
    }

    function success1(records) {
      $scope.kokts = records;
      $scope.kokts.forEach(function(kok){
        if (typeof(kok.images)!="undefined" && kok.images.length>0)

        kok.image = kok.images[0].src;
      })


      console.log($scope.kokts);
    }

    function getDesserts(query) {
      $scope.promise = Orders.list.get(query || $scope.query1, success).$promise;
    }

    function success(records) {
      $scope.orders = records;
      $scope.orders.data.forEach(function(buy) {
        buy.suma = 0;
        buy.buys.forEach(function(b) {
          buy.suma += Number(b.price) * Number(b.kolvo);
        })
        buy.suma = buy.suma.toFixed(2);
      });
    }

    function recalc() {
      $scope.zakaz.suma = 0;
      $scope.zakaz.buys.forEach(function(buy) {
        buy.pidsuma = (buy.price * buy.kolvo);
        $scope.zakaz.suma += buy.pidsuma;
      });
    }

    getDesserts1();
    getDesserts();

    $scope.querySearch = function(query) {
      return Items.auto.get({
        "search": query
      }).$promise.then(function(result) {
        return result.data;
      });
    }

    $scope.save = function() {
      var arr = [];
      var spisanie = [];

      if (typeof($scope.zakaz.id)=="undefined"){

        $scope.zakaz.buys.forEach(function(zak) {
          var obj = {
            id: zak.id,
            price: zak.price,
            kolvo: zak.kolvo
          }
          arr.push(obj);
        });

        var order = {
          buys: arr
        };

        Orders.buy.query({buys:arr}, function(item){
          getDesserts();getDesserts1();
          console.log(item);
        });
      }else{
        Orders.pai.get({id: $scope.zakaz.id}, function(item){
          getDesserts();getDesserts1();
          console.log(item);
        });
      }

    }

    $scope.new = function() {
      $scope.zakaz = {
        id: "",
        buys: []
      }
    }
    $scope.load = function(id){
        Orders.in.get({id: id}, function(item){
          $scope.zakaz = item;
          recalc()
        })
    }
    $scope.buy = function(kok) {
      console.log(kok);
      var obj = {
        id: kok.id,
        title: kok.title,
        price: kok.price,
        ingri: kok.ingri
      }


      if (kok.visible == true) {
        obj.kolvo = 1;
      } else {
        obj.kolvo = 50;
      }

      var checker = false;
      $scope.zakaz.buys.forEach(function(zak){
        if (zak.id == obj.id && kok.visible == true) {
          zak.kolvo++;
          checker = true;
        }
        if (zak.id == obj.id && kok.visible == false){
          obj.kolvo=+50;
          checker = true;
        }
      });

      if (!checker)
      $scope.zakaz.buys.push(obj);
      recalc();
    }

    $scope.delete_buy = function(kok) {
      console.log(kok);
      var arr = [];

      $scope.zakaz.buys.forEach(function(gg){
        arr.push(gg.id);
      });

      var index = arr.indexOf(kok.id);

      $scope.zakaz.buys.splice(index, 1);
    }

    $scope.delete_zak = function(it, ev) {
      var order = new Orders.in(it);
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

    $scope.editComment = function(event, dessert) {
      event.stopPropagation(); // in case autoselect is enabled
      var editDialog = {
        modelValue: dessert.kolvo,
        placeholder: 'Add a comment',
        ok: 'Сохранить',
        cancel: 'Отмена',
        save: function(input) {
          dessert.kolvo = input.$modelValue;
        },
        targetEvent: event,
        title: 'Количество'
      };

      var promise = $mdEditDialog.large(editDialog);
      promise.then(function(ctrl) {
        var input = ctrl.getInput();
      });
    };


    $scope.add_dolg = function(ev) {
      $rootScope.ig = {};
      $mdDialog.show({
        controller: 'DolgKasaDialogController',
        templateUrl: 'view/dolg_kasa_dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false
      }).then(getDesserts);
    };

    $scope.bezopl = function() {
      var arr = [];
      $scope.zakaz.buys.forEach(function(zak) {
        var obj = {
          id: zak.id,
          price: zak.price,
          kolvo: zak.kolvo
        }
        arr.push(arr);
      });
      var order = {
        buys: $scope.zakaz.buys,
        paid: false
      };
      var or = new Orders.in(order);
      or.$save().then(function() {
        getDesserts();
        $scope.zakaz = {
          id: "",
          buys: []
        };
      }, function(err) {
        console.log(err);
      });


    }


  }

})();
