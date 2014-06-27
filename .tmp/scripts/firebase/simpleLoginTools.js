(function() {
  angular.module('app.simpleLoginTools', []).service('waitForAuth', function($rootScope, $q, $timeout) {
    var def, fn, subs;
    fn = function(err) {
      var i;
      if ($rootScope.auth) {
        $rootScope.auth.error = (err instanceof Error ? err.toString() : null);
      }
      i = 0;
      while (i < subs.length) {
        subs[i]();
        i++;
      }
      $timeout(function() {
        def.resolve();
      });
    };
    def = $q.defer();
    subs = [];
    subs.push($rootScope.$on('$firebaseSimpleLogin:login', fn));
    subs.push($rootScope.$on('$firebaseSimpleLogin:logout', fn));
    subs.push($rootScope.$on('$firebaseSimpleLogin:error', fn));
    return def.promise;
  }).config(function($provide) {
    $provide.decorator('ngCloakDirective', function($delegate, waitForAuth) {
      var directive, _compile;
      directive = $delegate[0];
      _compile = directive.compile;
      directive.compile = function(element, attr) {
        waitForAuth.then(function() {
          _compile.call(directive, element, attr);
        });
      };
      return $delegate;
    });
  }).directive('ngShowAuth', function($rootScope) {
    var assertValidStates, getExpectedState, inList, loginState;
    loginState = 'logout';
    $rootScope.$on('$firebaseSimpleLogin:login', function() {
      return loginState = 'login';
    });
    $rootScope.$on('$firebaseSimpleLogin:logout', function() {
      return loginState = 'logout';
    });
    $rootScope.$on('$firebaseSimpleLogin:error', function() {
      return loginState = 'error';
    });
    getExpectedState = function(scope, attr) {
      var expState;
      expState = scope.$eval(attr);
      if (typeof expState !== "string" && !angular.isArray(expState)) {
        expState = attr;
      }
      if (typeof expState === "string") {
        expState = expState.split(",");
      }
      return expState;
    };
    inList = function(needle, list) {
      var res;
      res = false;
      angular.forEach(list, function(x) {
        if (x === needle) {
          res = true;
          return true;
        }
        return false;
      });
      return res;
    };
    assertValidStates = function(states) {
      if (!states.length) {
        throw new Error('ng-show-auth directive must be login, logout, or error (you may use a comma-separated list)');
      }
      angular.forEach(states, function(s) {
        if (!inList(s, ['login', 'logout', 'error'])) {
          throw new Error('Invalid state "' + s + '" for ng-show-auth directive, must be one of login, logout, or error');
        }
      });
      return true;
    };
    return {
      restrict: 'A',
      link: function(scope, el, attr) {
        var expState, fn;
        fn = function() {
          var show;
          show = inList(loginState, expState);
          setTimeout((function() {
            el.toggleClass('ng-cloak', !show);
          }), 0);
        };
        expState = getExpectedState(scope, attr.ngShowAuth);
        assertValidStates(expState);
        fn();
        $rootScope.$on('$firebaseSimpleLogin:login', fn);
        $rootScope.$on('$firebaseSimpleLogin:logout', fn);
        $rootScope.$on('$firebaseSimpleLogin:error', fn);
      }
    };
  });

}).call(this);
