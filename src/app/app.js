'use strict';

/**
 * @ngdoc overview
 * @name myAppApp
 * @description
 * # myAppApp
 *
 * Main module of the application.
 */
var myApp = angular
  .module('myWingsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'plusOne'
  ])
  .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
            templateUrl: 'app/home/home.html',
            controller: 'HomeCtrl'
        })
        .when('/about', {
            templateUrl: 'app/about/about.html',
            controller: 'AboutCtrl'
        })
        .when('/plusOneDemo', {
            templateUrl: 'app/plusOneDemo/plusOneDemo.html',
            controller: 'plusOneDemoCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
  });
