'use strict';

angular.module('healthexpress')

.controller('DashCtrl', function($scope, AuthenticationService, $state) {
  $scope.authentication = AuthenticationService;
  if(!$scope.authentication.authenticated){
    console.log('user is not authenticated');
    $state.go('login');
  }
  $scope.title = 'Dash';
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
