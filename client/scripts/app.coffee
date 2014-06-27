'use strict';

angular.module('app', [
  # Angular modules
  'ngRoute'
  'ngAnimate'
  # 3rd Party Modules
  'fx.animations'
  'ui.bootstrap'
  'easypiechart'
  'mgo-angular-wizard'
  'textAngular'
  'ui.tree'
  'ngMap'
  'ngTagsInput'
  'app.fire.config'
  'app.fire.services'
  'app.fire.filters'
  # 'app.fire.changeEmail'
  'app.fire.controllers'
  # 'app.simpleLoginTools'
  'app.routeSecurity'
  # Custom modules
  'app.ui.ctrls'
  'app.ui.directives'
  'app.ui.services'
  'app.controllers'
  'app.directives'
  'app.form.validation'
  'app.ui.form.ctrls'
  'app.ui.form.directives'
  'app.tables'
  'app.map'
  'app.task'
  'app.localization'
  'app.chart.ctrls'
  'app.chart.directives'
  'app.page.ctrls'
])

.config([
  '$routeProvider'
  ($routeProvider) ->
    $routeProvider
      # dashboard
      .when(
          '/'
          redirectTo: '/dashboard'
      )
      .when(
          '/dashboard'
          templateUrl: 'views/dashboard.html'
      )

      # Admin

      .when(
          # authRequired: true
          '/groups'
          templateUrl: 'views/admin/admin.html'
      )
      .when(
          '/pages/signin'
          templateUrl: 'views/pages/signin.html'
      )
      .when(
          '/pages/signup'
          templateUrl: 'views/pages/signup.html'
      )
      .when(
          '/pages/forgot'
          templateUrl: 'views/pages/forgot-password.html'
      )
      .when(
          '/pages/lock-screen'
          templateUrl: 'views/pages/lock-screen.html'
      )
      .when(
          '/pages/profile'
          templateUrl: 'views/pages/profile.html'
      )
      .when(
          '/404'
          templateUrl: 'views/pages/404.html'
      )
      .when(
          '/pages/500'
          templateUrl: 'views/pages/500.html'
      )

      .otherwise(
          redirectTo: '/404'
      )
])

# .run [
#   "loginService"
#   "$rootScope"
#   "FBURL"
#   (loginService, $rootScope, FBURL) ->
#     if FBURL is "https://INSTANCE.firebaseio.com"

#       # double-check that the app has been configured
#       angular.element(document.body).html "<h1>Please configure app/js/config.js before running!</h1>"
#       setTimeout (->
#         angular.element(document.body).removeClass "hide"
#         return
#       ), 250
#     else

#       # establish authentication
#       $rootScope.auth = loginService.init("/login")
#       $rootScope.FBURL = FBURL
# ]

# .run([
#   'loginService'
#   '$rootScope'
#   'FBURL'
#   (loginService, $rootScope, FBURL)->
#     if FBURL is "http://my-data-test.firebaseio.com/tests"

#       # double-check that the app has been configured
#       angular.element(document.body).html "<h1>Please configure app/js/config.js before running!</h1>"
#       setTimeout (->
#         angular.element(document.body).removeClass "hide"
#         return
#       ), 250
#     else

#       # establish authentication
#       $rootScope.auth = loginService.init("/pages/signin")
#       $rootScope.FBURL = FBURL
# ])
