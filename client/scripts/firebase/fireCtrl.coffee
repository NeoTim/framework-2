'use strict'

# /* Controllers */


  # .controller('ChatCtrl', ['$scope', 'syncData', function($scope, syncData) {
  #     $scope.newMessage = null;

  #     // constrain number of messages by limit into syncData
  #     // add the array into $scope.messages
  #     $scope.messages = syncData('messages', 10);

  #     // add new messages to the list
  #     $scope.addMessage = function() {
  #        if( $scope.newMessage ) {
  #           $scope.messages.$add({text: $scope.newMessage});
  #           $scope.newMessage = null;
  #        }
  #     };
  #  }])

angular.module('app.fire.controllers', [])
.controller('LoginCtrl', [
  '$scope', 'loginService', '$location',
  ($scope, loginService, $location) ->
    assertValidLoginAttempt = ->
      unless $scope.email
        $scope.err = 'Please enter an email address'

      else unless $scope.pass
        $scope.err = 'Please enter a password'

      else $scope.err = 'Passwords do not match' if $scope.pass isnt $scope.confirm

      not $scope.err
    $scope.email = null
    $scope.pass = null
    $scope.confirm = null
    $scope.createMode = false

    $scope.login = (cb)->
      $scope.err = null
      unless $scope.email
        $scope.err = 'Please enter an email address'
      else unless $scope.pass
        $scope.err = 'Please enter a password'
      else
        loginService.login $scope.email, $scope.pass, (err, user)->
          $scope.err = (if err then + "" else null)
          cb and cb(user) unless err
          return

      return

    $scope.createAccount = ->
      $scope.err = null
      if assertValidLoginAttempt()
        loginService.createAccount $scope.email, $scope.pass, (err, user)->
          if err
            $scope.err = (if err then err + "" else null)
          else
            $scope.login ->
              loginService.createProfile user.uid, user.email
              $location.path '/account'
              return

          return

      return
 ])

 .controller('AccountCtrl', [
  '$scope'
  'loginService'
  'changeEmailService'
  'firebaseRef'
  'syncData'
  '$location'
  'FBURL'
  ($scope, loginService, changeEmailService, firebaseRef, syncData, $location, FBURL)->
    $scope.syncAccount = ->
      $scope.user = {}
      syncData([
        'users'
        $scope.auth.user.uid
      ]).$bind($scope, 'user').then (unBind)->
        $scope.unBindAccount = unBind
        return

      return


    # // set initial binding
    $scope.syncAccount()

    $scope.logout = ->
      loginService.logout()
      return

    $scope.oldpass = null
    $scope.newpass = null
    $scope.confirm = null

    $scope.reset = ->
      $scope.err = null
      $scope.msg = null
      $scope.emailerr = null
      $scope.emailmsg = null
      return


    $scope.updatePassword = ->
      $scope.reset()
      loginService.changePassword(buildPwdParms())
      return


    $scope.updateEmail = ->
      $scope.reset()
      $scope.unBindAccount()
      changeEmailService(buildEmailParms())
      return

    buildPwdParms = ->

      email: $scope.auth.user.email
      oldpass: $scope.oldpass
      newpass: $scope.newpass
      confirm: $scope.confirm
      callback: (err)->
        if err
          $scope.err = err
        else
          $scope.oldpass = null
          $scope.newpass = null
          $scope.confirm = null
          $scope.msg = 'Password updated!'
        return

    buildEmailParms = ->
      newEmail: $scope.newemail,
      pass: $scope.pass,
      callback: (err)->
        if err
          $scope.emailerr = err
          $scope.syncAccount()
        else
          # // reinstate binding
          $scope.syncAccount()
          $scope.newemail = null
          $scope.pass = null
          $scope.emailmsg = 'Email updated!'
        return
 ])