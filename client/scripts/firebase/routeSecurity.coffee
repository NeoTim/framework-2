# ((angular)->
'use strict'
angular.module('app.routeSecurity', [])
.run([
  '$injector'
  '$location'
  '$rootScope'
  'loginRedirectPath'
  ($injector, $location, $rootScope, loginRedirectPath) ->
    new RouteSecurityManager($location, $rootScope, $injector.get('$route'), loginRedirectPath) if $injector.has('$route')
])

RouteSecurityManager = ($location, $rootScope, $route, path) ->
  @_route = $route
  @_location = $location
  @_rootScope = $rootScope
  @_loginPath = path
  @_redirectTo = null
  @_authenticated = !!($rootScope.auth and $rootScope.auth.user)
  @_init()
  return

RouteSecurityManager.prototype =
  _init: ->
    self = this
    @_checkCurrent();

     # // Set up a handler for all future route changes, so we can check
     # // if authentication is required.
    @_rootScope.$on "$routeChangeStart", (e, next)=>
      @_authRequiredRedirect next, @_loginPath
      return


    self._rootScope.$on('$firebaseSimpleLogin:login', angular.bind(this, @_login));
    self._rootScope.$on('$firebaseSimpleLogin:logout', angular.bind(this, @_logout));
    self._rootScope.$on('$firebaseSimpleLogin:error', angular.bind(this, @_error));
    return

  _checkCurrent: ->
    # // Check if the current page requires authentication.
    @_authRequiredRedirect @_route.current, @_loginPath if @_route.current
    return

  _login: ->
    @_authenticated = true
    if @_redirectTo
      @_redirect @_redirectTo
      @_redirectTo = null
    else if @_location.path() is @_loginPath
      @_location.replace()
      @_location.path('/')
    return

  _logout: ->
    @_authenticated = false
    @_checkCurrent()
    return

  _error: ->
    @_authenticated = false if not @_rootScope.auth or not @_rootScope.auth.user
    @checkCurrent()
    return

  _redirect: (path)->
    @_location.replace()
    @_location.path path
    return

  # // A function to check whether the current path requires authentication,
  # // and if so, whether a redirect to a login page is needed.
  _authRequiredRedirect: (route, path)->
    if route.authRequired and not this._authenticated
      if route.pathTo is 'undefined'
        @_redirectTo = @_location.path()
      else
        @_redirectTo = (if route.pathTo is path then "/" else routeTo)

      @_redirect(path)

    else @_redirect '/' if @_authenticated and @_location.path() is @_loginPath
    return

# ) angular
