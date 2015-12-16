'use strict';
angular.module('healthexpress')
  .factory('AuthenticationService', ['$window', function($window) {
    var authenticationService = {};
    this.user = JSON.parse($window.localStorage.getItem('firebase:session::health-express'));
    var _authenticated = false;
    if (this.user) {
      _authenticated = true;
    }

    var _destroyLogin = function() {
      $window.localStorage.removeItem('firebase:session::health-express');
      this.user = {};
      _authenticated = false;
    };

    authenticationService.authenticated = _authenticated;
    authenticationService.destroyLogin = _destroyLogin;
    return authenticationService;
  }]);
