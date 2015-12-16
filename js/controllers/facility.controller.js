'use strict';

angular.module('healthexpress')

  .controller('FacilityCtrl', function ($scope, $ionicPopup, $ionicLoading, FirebaseService, $stateParams, $state, $ionicHistory) {

    $scope.newFacility = {};
    $scope.facilities = [];
    var limit = 20;

    $scope.startLoading = function (text) {
      $ionicLoading.show({
        template: '<p>' + text + '</p><ion-spinner></ion-spinner>',
        showBackdrop: false
      });
    };

    $scope.stopLoading = function () {
      $ionicLoading.hide();
    };

    $scope.list = function (refresh) {
      $scope.title = $stateParams.facilityType;
      $scope.startLoading('Loading facilities...');
      var facilities = FirebaseService.paginate('facilities/' + $stateParams.facilityType, limit);
      facilities.$loaded(function (data) {
        if (data) {
          for (var i = 0; i < data.length; i++) {
            angular.extend(data[i],
              {
                star: $scope.star((5 - i) % 6),
                distance: (i * .7 || .5).toFixed(1) + 'Km away'
              });
            $scope.facilities.push(data[i]);
          }
          $scope.stopLoading();
        }
      }, function (error) {
        if (error) {
          $scope.showAlert('ERROR', error);
          console.error('Error:', error);
        }
        $scope.stopLoading();
      });

      if (refresh) {
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$apply();
      }
    };

    $scope.loadMore = function () {
      // get the last item
      var lastFacility = $scope.facilities[$scope.facilities.length - 1];
      if (lastFacility) {
        var moreFacilities = FirebaseService.paginate('facilities/' + $stateParams.facilityType, limit + 1, lastFacility.$id);
        moreFacilities.$loaded(function (data) {
          if (data) {
            for (var i = 1; i < data.length; i++) {
              angular.extend(data[i],
                {
                  star: $scope.star((5 - i) % 6),
                  distance: (i * .7 || .5).toFixed(1) + 'Km away'
                });
              $scope.facilities.push(data[i]);
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }
        }, function (error) {
          if (error)
            console.error('Error:', error);
        });
      }
    };

    $scope.$on('$stateChangeSuccess', function () {
      $scope.loadMore();
    });

    $scope.showFacility = function (id, type, star, distance) {
      $state.go('tab.facility-detail', {
        'facilityId': id,
        'facilityType': type,
        'star': star,
        'distance': distance
      });
    };

    $scope.showFacilities = function (type) {
      $state.go('tab.facility-by-type', {'facilityType': type});
    };

    $scope.loadFacility = function () {
      $scope.startLoading('Loading facility...');
      $scope.facility = FirebaseService.get('facilities/' + $stateParams.facilityType, $stateParams.facilityId);
      $scope.facility.$loaded(function (data) {
        angular.extend(data,
          {
            star: $stateParams.star,
            distance: $stateParams.distance
          });
        if (data.gps) {
          $scope.initialize(data.gps.latitude, data.gps.longitude);
          $scope.stopLoading();
        }
      }, function (error) {
        if (error)
          console.error('Error:', error);
      });
    };

    $scope.initialize = function (lat, lng) {
      var latLng = new google.maps.LatLng(lat, lng);

      var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: 'Health Express'
      });
      $scope.map = map;
    };

    // An alert dialog
    $scope.showAlert = function (title, msg) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: msg
      });
      alertPopup.then(function (res) {
        console.log(res);
      });
    };

    // Load categories
    $scope.loadCategories = function () {
      $scope.startLoading('Loading categories...');
      $scope.categories = FirebaseService.all('categories', 'priority');
      $scope.categories.$loaded(function (data) {
        if (data) {
          $scope.stopLoading();
        }
      }, function (error) {
        if (error) {
          console.error('Error:', error);
          $scope.stopLoading();
        }
      });
    };

    // rating
    $scope.rand = function () {
      return Math.floor((Math.random() * 5) + 1);
    };

    $scope.star = function (n) {
      return '★★★★★'.slice(-n);
    };
  });
