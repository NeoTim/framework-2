# 'use strict'

angular.module('app.fire.changeEmail', [])
.factory 'changeEmailService', [
  '$rootScope'
  'firebaseRef'
  '$timeout'
  '$q'
  'loginService'
  ($rootScope, firebaseRef, $timeout, $q, loginService)->
    auth = $rootScope.auth
    return (opts)->
      cb = opts.callback or ->
      oldUid = auth.user.uid
      oldEmail = auth.user.email
      oldProfile
      refProfile = firebaseRef 'users', oldUid

      # // promise functions
      authenticate = ->
        d = $q.defer()
        loginService.login oldEmail, opts.pass, (err, user) ->
          if err
            d.reject err
          else
            d.resolve()
          return

        d.promise


      loadOldProfile = ->
        d = $q.defer()
        refProfile.once "value", ((snap) ->
          oldProfile = snap.val()

          # update user profile to have new email
          oldProfile.email = opts.newEmail
          d.resolve()
          return
        ), (err) ->
          d.reject err
          return

        d.promise

      createNewAccount = ->

        d = $q.defer();
        loginService.createAccount opts.newEmail, opts.pass, (err, user)->
          if err
            d.reject(err)
          else
            d.resolve();


        return d.promise;


      copyProfile = ->
        d = $q.defer()
        refNewProfile = firebaseRef 'users', auth.user.uid
        refNewProfile.set oldProfile, (err)->
          if err
            d.reject(err)
          else
            d.resolve()

        return d.promise

      removeOldProfile = ->
        d = $q.defer()
        refProfile.remove (err)->
          if err
            d.reject(err)
          else
            d.resolve()


        return d.promise

      removeOldLogin = ->
        d = $q.defer()
        auth.$removeUser(oldEmail, opts.pass).then (->
          d.resolve()
          return
        ), (err) ->
          d.reject err
          return

        d.promise

      errorFn = (err)->
         $timeout -> cb(err)

      # // execute activities in order; first we authenticate the user
         # // then we fetch old account details
         # // then we create a new account
         # // then we copy old account info
         # // and once they safely exist, then we can delete the old ones
         # // success
      authenticate()
         .then( loadOldProfile )
         .then( createNewAccount )
         .then( copyProfile )
         .then( removeOldProfile )
         .then( removeOldLogin )
         .then( ->
            cb and cb(null)
            return

          cb = undefined)
         .catch( errorFn )

]