(function() {
  'use strict';
  angular.module('app.fire.login', []).factory('loginService', [
    '$rootScope', '$firebaseSimpleLogin', 'firebaseRef', 'profileCreator', '$timeout', function($rootScope, $firebaseSimpleLogin, firebaseRef, profileCreator, $timeout) {
      var assertAuth, auth;
      assertAuth = function() {
        if (auth === null) {
          throw new Error('Must call loginService.init() before using its methods');
        }
      };
      auth = null;
      return {
        init: function() {
          return auth = $firebaseSimpleLogin(firebaseRef());
        },
        login: function(email, pass, callback) {
          assertAuth();
          auth.$login('password', {
            email: email,
            password: pass,
            rememberMe: true
          }).then((function(user) {
            if (callback) {
              callback(null, user);
            }
          }), callback);
        },
        logout: function() {
          assertAuth();
          auth.$logout();
        },
        changePassword: function(opts) {
          var cb;
          assertAuth();
          cb = opts.callback || function() {};
          if (!opts.oldpass || !opts.newpass) {
            $timeout(function() {
              cb('Please enter a password');
            });
          } else if (opts.newpass !== opts.confirm) {
            $timeout(function() {
              cb('Passwords do not match');
            });
          } else {
            auth.$changePassword(opts.email, opts.oldpass, opts.newpass).then((function() {
              cb && cb(null);
            }), cb);
          }
        },
        createAccount: function(email, pass, callback) {
          assertAuth();
          auth.$createUser(email, pass).then((function(user) {
            callback && callback(null, user);
          }), callback);
        },
        createProfile: profileCreator
      };
    }
  ]).factory('profileCreator', [
    'firebaseRef', '$timeout', function(firebaseRef, $timeout) {
      var firstPartOfEmail, ucfirst;
      return function(id, email, callback) {
        return firebaseRef('users/' + id).set({
          email: email,
          name: firstPartOfEmail(email)
        }, function(err) {
          if (callback) {
            return $timeout(function() {
              return callback(err);
            });
          }
        });
      };
      firstPartOfEmail = function(email) {
        return ucfirst(email.substr(0, email.indexOf('@')) || "");
      };
      ucfirst = function(str) {
        var f;
        str += '';
        f = str.charAt(0).toUpperCase();
        return f + str.substr(1);
      };
      firebaseRef("users/" + id).set({
        email: email,
        name: firstPartOfEmail(email)
      }, function(err) {
        if (callback) {
          $timeout(function() {
            callback(err);
          });
        }
      });
    }
  ]);

}).call(this);
