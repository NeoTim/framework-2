(function() {
  'use strict';
  var RouteSecurityManager;

  angular.module('app.routeSecurity', []).run([
    '$injector', '$location', '$rootScope', 'loginRedirectPath', function($injector, $location, $rootScope, loginRedirectPath) {
      if ($injector.has('$route')) {
        return new RouteSecurityManager($location, $rootScope, $injector.get('$route'), loginRedirectPath);
      }
    }
  ]);

  RouteSecurityManager = function($location, $rootScope, $route, path) {
    this._route = $route;
    this._location = $location;
    this._rootScope = $rootScope;
    this._loginPath = path;
    this._redirectTo = null;
    this._authenticated = !!($rootScope.auth && $rootScope.auth.user);
    this._init();
  };

  RouteSecurityManager.prototype = {
    _init: function() {
      var self;
      self = this;
      this._checkCurrent();
      this._rootScope.$on("$routeChangeStart", (function(_this) {
        return function(e, next) {
          _this._authRequiredRedirect(next, _this._loginPath);
        };
      })(this));
      self._rootScope.$on('$firebaseSimpleLogin:login', angular.bind(this, this._login));
      self._rootScope.$on('$firebaseSimpleLogin:logout', angular.bind(this, this._logout));
      self._rootScope.$on('$firebaseSimpleLogin:error', angular.bind(this, this._error));
    },
    _checkCurrent: function() {
      if (this._route.current) {
        this._authRequiredRedirect(this._route.current, this._loginPath);
      }
    },
    _login: function() {
      this._authenticated = true;
      if (this._redirectTo) {
        this._redirect(this._redirectTo);
        this._redirectTo = null;
      } else if (this._location.path() === this._loginPath) {
        this._location.replace();
        this._location.path('/');
      }
    },
    _logout: function() {
      this._authenticated = false;
      this._checkCurrent();
    },
    _error: function() {
      if (!this._rootScope.auth || !this._rootScope.auth.user) {
        this._authenticated = false;
      }
      this.checkCurrent();
    },
    _redirect: function(path) {
      this._location.replace();
      this._location.path(path);
    },
    _authRequiredRedirect: function(route, path) {
      if (route.authRequired && !this._authenticated) {
        if (route.pathTo === 'undefined') {
          this._redirectTo = this._location.path();
        } else {
          this._redirectTo = (route.pathTo === path ? "/" : routeTo);
        }
        this._redirect(path);
      } else {
        if (this._authenticated && this._location.path() === this._loginPath) {
          this._redirect('/');
        }
      }
    }
  };

}).call(this);
