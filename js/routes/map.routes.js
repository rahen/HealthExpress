'use strict';

angular.module('healthexpress')
  .config(function($stateProvider) {
    $stateProvider
      .state('tab.maps', {
        url: '/maps',
        views: {
          'tab-maps': {
            templateUrl: 'templates/maps/index.html',
            controller: 'MapCtrl'
          }
        }
      });
  });
