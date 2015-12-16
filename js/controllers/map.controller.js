'use strict';

angular.module('healthexpress')
  .controller('MapCtrl', function($scope, $ionicLoading, AuthenticationService, $state) {

    $scope.mapCreated = function(map, marker) {
      $scope.map = map;
      $scope.marker = marker;
      $scope.centerOnMe();
    };

    $scope.centerOnMe = function() {
      console.log('Centering');
      if (!$scope.map) {
        return;
      }

      $ionicLoading.show({
        template: '<p>Getting current location...</p><ion-spinner></ion-spinner>',
        showBackdrop: false
      });

      navigator.geolocation.getCurrentPosition(function(pos) {
        console.log('Got pos', pos);
        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        $scope.marker = new google.maps.Marker({
          position: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          },
          map: $scope.map,
          title: 'My location'
        });
        $ionicLoading.hide();
      }, function(error) {
        console.error('Unable to get location: ' + error.message);
      });
    };
  });
