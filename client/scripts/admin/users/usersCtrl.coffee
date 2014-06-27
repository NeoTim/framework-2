angular.module('admin.controller.users', [])

.controller( 'usersCtrl', [
  '$scope'
  'Rolls'
  'Users'
  'syncData'
  ($scope, Rolls, Users, syncData)->

    # $scope.users = Users
    $scope.users = Users

    $scope.createUser = (data)->
      $scope.users.save(data)
])