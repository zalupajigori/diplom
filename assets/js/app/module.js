(function(){
    'use strict';

    angular.module('app',[
        'ngRoute',
        'ngResource',
        'ngMaterial',
        'ngMdIcons',
        'ngCookies',
        'ngMessages',
        'angular-loading-bar',
        'ngAnimate',
        'md.data.table',
        'ngFileUpload'
    //    'angular.filter'
    ]).config(appConfig);

    appConfig.$inject = ["$routeProvider"];
    function appConfig($routeProvider){

        $routeProvider
            .when('/',{
            templateUrl: "view/home.html",
            controller: 'HomeController'
            })
            .when('/ingri',{

            templateUrl: "view/sprav_in.html",
            controller: 'SpravinController'

            })
            .when('/kalky',{

                templateUrl: "view/sprav_ka.html",
                controller: 'SpravkaController'

            })
            .when('/naklav',{

                templateUrl: "view/naklav.html",
                controller: 'NaklavController'

            })
            .when('/kasa',{

                templateUrl: "view/kasa.html",
                controller: "KasaController"

            })
            .when('/itog',{

                templateUrl: "view/itog.html",
                controller: "ItogController"

            })
            .when('/post',{

                templateUrl: "view/post.html",
                controller: "PostController"

            })
            .when('/sklad',{

                templateUrl: "view/sklad.html",
                controller: "SkladController"

            })
            .when('/dolg',{

                templateUrl: "view/dolg.html",
                controller: "DolgController"

            })
            .when('/sklad_ras',{

                templateUrl: "view/sklad_ras.html",
                controller: "SkladRasController"

            })
            .otherwise({
            redirectTo: '/'
        })
    }


})();
