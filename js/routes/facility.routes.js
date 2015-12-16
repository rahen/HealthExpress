'use strict';

angular.module('healthexpress')
  .config(function($stateProvider) {
    $stateProvider
      .state('tab.facilities', {
        url: '/facilities',
        views: {
          'tab-facilities': {
            templateUrl: 'templates/facilities/index.html',
            controller: 'FacilityCtrl'
          }
        }
      })
      .state('tab.facility-by-type', {
        url: '/facilities/:facilityType',
        views: {
          'tab-facilities': {
            templateUrl: 'templates/facilities/list.html',
            controller: 'FacilityCtrl'
          }
        }
      })
      .state('tab.facility-detail', {
        url: '/facilities/:facilityType/:facilityId/:star/:distance',
        views: {
          'tab-facilities': {
            templateUrl: 'templates/facilities/detail.html',
            controller: 'FacilityCtrl'
          }
        }
      });
  });
