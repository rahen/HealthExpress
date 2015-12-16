'use strict';

angular.module('healthexpress')
  .directive('map', function() {
    return {
      restrict: 'E',
      scope: {
        onCreate: '&'
      },
      link: function($scope, $element, $attr) {
        function initialize() {
          var pos = new google.maps.LatLng($scope.facility.gps.latitude, scope.facility.gps.longitude);
          var mapOptions = {
            center: pos,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          var map = new google.maps.Map($element[0], mapOptions);
          var marker = new google.maps.Marker({
            position: pos,
            map: map,
            title: 'Health Express'
          });
          $scope.onCreate({
            map: map,
            marker: marker
          });

          // Stop the side bar from dragging when mousedown/tapdown on the map
          google.maps.event.addDomListener($element[0], 'mousedown', function(e) {
            e.preventDefault();
            return false;
          });
        }

        if (document.readyState === 'complete') {
          initialize();
        } else {
          google.maps.event.addDomListener(window, 'load', initialize);
        }
      }
    };
  });
