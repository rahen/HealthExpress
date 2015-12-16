'use strict';

angular.module('healthexpress')
  .config(function($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'templates/users/login.html',
        controller: 'UserCtrl'
      })
      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/users/account.html',
            controller: 'UserCtrl'
          }
        }
      });
  });
