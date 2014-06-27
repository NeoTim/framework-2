'use strict'

angular.module('app.fire.login', [])
.factory('loginService', [
  '$rootScope'
  '$firebaseSimpleLogin'
  'firebaseRef'
  'profileCreator'
  '$timeout'
  ($rootScope, $firebaseSimpleLogin, firebaseRef, profileCreator, $timeout)->
    assertAuth = ()->
      throw new Error('Must call loginService.init() before using its methods') if auth is null
      return

    auth = null
    return (
      init: ->
        auth = $firebaseSimpleLogin(firebaseRef())

      login: (email, pass, callback) ->
        assertAuth()
        auth.$login('password',
          email: email,
          password: pass,
          rememberMe: true
        ).then ((user)->
          callback null, user if callback
          return
        ), callback
        return
          # if callback then callback(null, user), callback


      logout: ->
         assertAuth()
         auth.$logout()
         return

      changePassword: (opts)->
        assertAuth()
        cb = opts.callback || ->
        if not opts.oldpass or not opts.newpass
          $timeout ->
            cb 'Please enter a password'
            return

        else if opts.newpass isnt opts.confirm
          $timeout ->
            cb 'Passwords do not match'
            return

        else
          auth.$changePassword(opts.email, opts.oldpass, opts.newpass).then (->
            cb and cb(null)
            return
          ), cb
        return

      createAccount: (email, pass, callback) ->
        assertAuth()
        auth.$createUser(email, pass).then ((user) ->
          callback and callback(null, user)
          return
        ), callback
        return

      createProfile: profileCreator
    )
]).factory 'profileCreator', [
  'firebaseRef'
  '$timeout'
  (firebaseRef, $timeout)->
    return (id, email, callback)->
      firebaseRef('users/'+id).set({email: email, name: firstPartOfEmail(email)}, (err)->
        # //err && console.error(err);
        if callback then $timeout( -> callback(err) )
     )

    firstPartOfEmail = (email)->
      ucfirst email.substr(0, email.indexOf('@')) or ""

    ucfirst = (str)->
      # // credits: http://kevin.vanzonneveld.net
      str += ''
      f = str.charAt(0).toUpperCase()
      f + str.substr(1)
    firebaseRef("users/"+id).set
      email: email
      name: firstPartOfEmail(email)
    , (err)->
      if callback
        $timeout ->
          callback err
          return
      return
    return
]
