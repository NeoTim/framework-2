(function() {
  angular.module('app.fire.changeEmail', []).factory('changeEmailService', [
    '$rootScope', 'firebaseRef', '$timeout', '$q', 'loginService', function($rootScope, firebaseRef, $timeout, $q, loginService) {
      var auth;
      auth = $rootScope.auth;
      return function(opts) {
        var authenticate, cb, copyProfile, createNewAccount, errorFn, loadOldProfile, oldEmail, oldUid, refProfile, removeOldLogin, removeOldProfile;
        cb = opts.callback || function() {};
        oldUid = auth.user.uid;
        oldEmail = auth.user.email;
        oldProfile;
        refProfile = firebaseRef('users', oldUid);
        authenticate = function() {
          var d;
          d = $q.defer();
          loginService.login(oldEmail, opts.pass, function(err, user) {
            if (err) {
              d.reject(err);
            } else {
              d.resolve();
            }
          });
          return d.promise;
        };
        loadOldProfile = function() {
          var d;
          d = $q.defer();
          refProfile.once("value", (function(snap) {
            var oldProfile;
            oldProfile = snap.val();
            oldProfile.email = opts.newEmail;
            d.resolve();
          }), function(err) {
            d.reject(err);
          });
          return d.promise;
        };
        createNewAccount = function() {
          var d;
          d = $q.defer();
          loginService.createAccount(opts.newEmail, opts.pass, function(err, user) {
            if (err) {
              return d.reject(err);
            } else {
              return d.resolve();
            }
          });
          return d.promise;
        };
        copyProfile = function() {
          var d, refNewProfile;
          d = $q.defer();
          refNewProfile = firebaseRef('users', auth.user.uid);
          refNewProfile.set(oldProfile, function(err) {
            if (err) {
              return d.reject(err);
            } else {
              return d.resolve();
            }
          });
          return d.promise;
        };
        removeOldProfile = function() {
          var d;
          d = $q.defer();
          refProfile.remove(function(err) {
            if (err) {
              return d.reject(err);
            } else {
              return d.resolve();
            }
          });
          return d.promise;
        };
        removeOldLogin = function() {
          var d;
          d = $q.defer();
          auth.$removeUser(oldEmail, opts.pass).then((function() {
            d.resolve();
          }), function(err) {
            d.reject(err);
          });
          return d.promise;
        };
        errorFn = function(err) {
          return $timeout(function() {
            return cb(err);
          });
        };
        return authenticate().then(loadOldProfile).then(createNewAccount).then(copyProfile).then(removeOldProfile).then(removeOldLogin).then(function() {
          cb && cb(null);
        }, cb = void 0)["catch"](errorFn);
      };
    }
  ]);

}).call(this);
