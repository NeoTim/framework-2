(function() {
  'use strict';
  angular.module('app.fire.controllers', []).controller('LoginCtrl', [
    '$scope', 'loginService', '$location', function($scope, loginService, $location) {
      var assertValidLoginAttempt;
      assertValidLoginAttempt = function() {
        if (!$scope.email) {
          $scope.err = 'Please enter an email address';
        } else if (!$scope.pass) {
          $scope.err = 'Please enter a password';
        } else {
          if ($scope.pass !== $scope.confirm) {
            $scope.err = 'Passwords do not match';
          }
        }
        return !$scope.err;
      };
      $scope.email = null;
      $scope.pass = null;
      $scope.confirm = null;
      $scope.createMode = false;
      $scope.login = function(cb) {
        $scope.err = null;
        if (!$scope.email) {
          $scope.err = 'Please enter an email address';
        } else if (!$scope.pass) {
          $scope.err = 'Please enter a password';
        } else {
          loginService.login($scope.email, $scope.pass, function(err, user) {
            $scope.err = (err ? +"" : null);
            if (!err) {
              cb && cb(user);
            }
          });
        }
      };
      return $scope.createAccount = function() {
        $scope.err = null;
        if (assertValidLoginAttempt()) {
          loginService.createAccount($scope.email, $scope.pass, function(err, user) {
            if (err) {
              $scope.err = (err ? err + "" : null);
            } else {
              $scope.login(function() {
                loginService.createProfile(user.uid, user.email);
                $location.path('/account');
              });
            }
          });
        }
      };
    }
  ]).controller('AccountCtrl', [
    '$scope', 'loginService', 'changeEmailService', 'firebaseRef', 'syncData', '$location', 'FBURL', function($scope, loginService, changeEmailService, firebaseRef, syncData, $location, FBURL) {
      var buildEmailParms, buildPwdParms;
      $scope.syncAccount = function() {
        $scope.user = {};
        syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user').then(function(unBind) {
          $scope.unBindAccount = unBind;
        });
      };
      $scope.syncAccount();
      $scope.logout = function() {
        loginService.logout();
      };
      $scope.oldpass = null;
      $scope.newpass = null;
      $scope.confirm = null;
      $scope.reset = function() {
        $scope.err = null;
        $scope.msg = null;
        $scope.emailerr = null;
        $scope.emailmsg = null;
      };
      $scope.updatePassword = function() {
        $scope.reset();
        loginService.changePassword(buildPwdParms());
      };
      $scope.updateEmail = function() {
        $scope.reset();
        $scope.unBindAccount();
        changeEmailService(buildEmailParms());
      };
      buildPwdParms = function() {
        return {
          email: $scope.auth.user.email,
          oldpass: $scope.oldpass,
          newpass: $scope.newpass,
          confirm: $scope.confirm,
          callback: function(err) {
            if (err) {
              $scope.err = err;
            } else {
              $scope.oldpass = null;
              $scope.newpass = null;
              $scope.confirm = null;
              $scope.msg = 'Password updated!';
            }
          }
        };
      };
      return buildEmailParms = function() {
        return {
          newEmail: $scope.newemail,
          pass: $scope.pass,
          callback: function(err) {
            if (err) {
              $scope.emailerr = err;
              $scope.syncAccount();
            } else {
              $scope.syncAccount();
              $scope.newemail = null;
              $scope.pass = null;
              $scope.emailmsg = 'Email updated!';
            }
          }
        };
      };
    }
  ]);

}).call(this);
