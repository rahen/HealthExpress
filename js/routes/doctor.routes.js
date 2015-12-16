'use strict';

angular.module('healthexpress')
  .config(function($stateProvider) {
    $stateProvider
      .state('tab.doctors', {
        url: '/doctors',
        views: {
          'tab-doctors': {
            templateUrl: 'templates/doctors/list.html',
            controller: 'DoctorCtrl'
          }
        }
      });
  });
