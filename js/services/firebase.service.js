'use strict';
angular.module('healthexpress')
  .factory('FirebaseService', ['$firebaseArray', '$firebaseObject', 'firebaseURL',
    function ($firebaseArray, $firebaseObject, firebaseURL) {
      return {
        ref: function (child) {
          return new Firebase(firebaseURL + '/' + child);
        },
        all: function (child, orderPath) {
          var ref = new Firebase(firebaseURL + '/' + child);
          var query = ref;
          if(orderPath && typeof orderPath !== 'undefined'){
            query = ref.orderByChild(orderPath);
          }
          return $firebaseArray(query);
        },
        paginate: function (child, limit, startAt) {
          var ref = new Firebase(firebaseURL + '/' + child);
          var query = ref.orderByKey().limitToFirst(limit);
          if (startAt && typeof startAt !== 'undefined') {
            query = ref.orderByKey().startAt(startAt).limitToFirst(limit);
          }

          return $firebaseArray(query);
        },
        get: function (child, id) {
          var ref = new Firebase(firebaseURL + '/' + child + '/' + id);
          return $firebaseObject(ref);
        }
      };
    }
  ]);
