angular.module('admin.controller.rolls', [])

.controller( 'rollsCtrl', [
  '$scope'
  'Rolls'
  'Users'
  ($scope, Rolls, Users)->
    $scope.rolls = Rolls

    $scope.createRoll = (data)->
      $scope.rolls.save(data)

])