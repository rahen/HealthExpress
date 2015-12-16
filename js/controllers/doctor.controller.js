'use strict';

angular.module('healthexpress')

  .controller('DoctorCtrl', function ($scope, $ionicModal, $ionicLoading, FirebaseService, AuthenticationService, $state) {

    $scope.newDoctor = {};

    $scope.startLoading = function () {
      $ionicLoading.show({
        template: '<p>Loading doctors...</p><ion-spinner></ion-spinner>',
        showBackdrop: false
      });
    };

    $scope.stopLoading = function () {
      $ionicLoading.hide();
    };

    $scope.listDoctors = function (refresh) {
      $scope.startLoading();
      $scope.doctors = FirebaseService.all('doctors');
      $scope.doctors.$loaded(function (data) {
        if(data){
          $scope.stopLoading();
        }
      }, function (error) {
        if (error) {
          console.error('Error:', error);
          $scope.stopLoading();
        }
      });

      if (refresh) {
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$apply();
      }
    };

    $scope.showModal = function (template, doctor) {
      if (doctor)
        $scope.doctor = FirebaseService.get('doctors', doctor.$id);

      $ionicModal.fromTemplateUrl('templates/doctors/' + template, {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });
    };

    $scope.reset = function () {
      $scope.newDoctor.name = '';
      $scope.newDoctor.email = '';
      $scope.newDoctor.visitingHours = '';
    };

    $scope.addDoctor = function () {
      console.log($scope.newDoctors);
      $scope.doctors.$add({
        name: $scope.newDoctor.name,
        email: $scope.newDoctor.email,
        visitingHours: $scope.newDoctor.visitingHours
      }).then(function (error) {
        if (error)
          console.error('Error:', error);
      });
      $scope.reset();
      $scope.modal.hide();
    };

    $scope.removeDoctor = function (doctor) {
      $scope.doctors.$remove(doctor);
    };

    $scope.updateDoctor = function () {
      console.log($scope.doctor);
      $scope.doctor.$save().then(function (ref) {
        if (ref.key() === $scope.doctor.$id)
          $scope.modal.hide();
      }, function (error) {
        console.error('Error:', error);
      });

    };

  });
