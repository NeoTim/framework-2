'use strict'

pathRef = (args) ->
  i = 0

  while i < args.length
    args[i] = pathRef(args[i])  if typeof (args[i]) is "object"
    i++
  args.join "/"

angular.module('app.fire.services', [
  'firebase'
]) .factory('firebaseRef', [
  'Firebase'
  'FBURL'
  (Firebase, FBURL)->
    return (path)->
      new Firebase pathRef([FBURL].concat(Array.prototype.slice.call(arguments)))
]).service('syncData', [
  '$firebase', 'firebaseRef'
  ($firebase, firebaseRef) ->

    return (path, limit)->
      ref = firebaseRef(path)
      limit and (ref = ref.limit(limit))
      $firebase ref
])

###

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

###