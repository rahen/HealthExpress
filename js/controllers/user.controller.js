'use strict';

angular.module('healthexpress')
  .controller('UserCtrl', function ($scope, $state, $ionicPopup, $ionicLoading, FirebaseService, AuthenticationService) {
    // Get a reference to the Firebase
    $scope.firebaseRef = FirebaseService.ref('');
    // Get the authentication service
    $scope.authentication = AuthenticationService;
    // Initially set no user to be logged in
    $scope.user = {
      email: '',
      password: ''
    };

    $scope.startLoading = function () {
      $ionicLoading.show({
        template: '<p>Authenticating...</p><ion-spinner></ion-spinner>',
        showBackdrop: false
      });
    };

    $scope.stopLoading = function () {
      $ionicLoading.hide();
    };

    $scope.login = function () {
      $scope.startLoading();
      $scope.firebaseRef.authWithPassword({
        email: $scope.user.email,
        password: $scope.user.password
      }, function (error, authData) {
        $scope.stopLoading();
        if (error) {
          $scope.error = error;
          $scope.showAlert('ERROR!', error);
        } else {
          $scope.user = {
            email: '',
            password: ''
          };
          $scope.authentication.authenticated = true;
          $state.go('tab.dash', {
            url: '/tab/dash'
          });
        }
      });
    };

    $scope.loginGoogle = function () {
      $scope.startLoading();
      $scope.firebaseRef.authWithOAuthPopup("google",
        function (error, authData) {
          $scope.stopLoading();
          if (error) {
            $scope.error = error;
            $scope.showAlert('ERROR!', error);
          } else {
            $scope.authentication.authenticated = true;
            $state.go('tab.dash', {
              url: '/tab/dash'
            });
          }
        });
    };

    $scope.logout = function () {
      $scope.firebaseRef.unauth();
      $scope.authentication.authenticated = false;
      $state.go('login');
    };

    // An alert dialog
    $scope.showAlert = function(title, msg) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: msg
      });
      alertPopup.then(function(res) {
        console.log(res);
      });
    };
  });
