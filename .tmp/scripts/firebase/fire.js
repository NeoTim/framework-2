(function() {
  'use strict';
  var pathRef;

  pathRef = function(args) {
    var i;
    i = 0;
    while (i < args.length) {
      if (typeof args[i] === "object") {
        args[i] = pathRef(args[i]);
      }
      i++;
    }
    return args.join("/");
  };

  angular.module('app.fire.services', ['firebase']).factory('firebaseRef', [
    'Firebase', 'FBURL', function(Firebase, FBURL) {
      return function(path) {
        return new Firebase(pathRef([FBURL].concat(Array.prototype.slice.call(arguments))));
      };
    }
  ]).service('syncData', [
    '$firebase', 'firebaseRef', function($firebase, firebaseRef) {
      return function(path, limit) {
        var ref;
        ref = firebaseRef(path);
        limit && (ref = ref.limit(limit));
        return $firebase(ref);
      };
    }
  ]);


  /*
  
  angular.module('myApp.service.firebase', ['firebase'])
  
  // a simple utility to create references to Firebase paths
     .factory('firebaseRef', ['Firebase', 'FBURL', function(Firebase, FBURL) {
  
        return function(path) {
           return new Firebase(pathRef([FBURL].concat(Array.prototype.slice.call(arguments))));
        }
     }])
  
     // a simple utility to create $firebase objects from angularFire
     .service('syncData', ['$firebase', 'firebaseRef', function($firebase, firebaseRef) {
  
        return function(path, limit) {
           var ref = firebaseRef(path);
           limit && (ref = ref.limit(limit));
           return $firebase(ref);
        }
     }]);
  
  function pathRef(args) {
     for(var i=0; i < args.length; i++) {
        if( typeof(args[i]) === 'object' ) {
           args[i] = pathRef(args[i]);
        }
     }
     return args.join('/');
  }
   */

}).call(this);
