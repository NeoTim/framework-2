(function() {
  angular.module('admin.controller.rolls', []).controller('rollsCtrl', [
    '$scope', 'Rolls', 'Users', function($scope, Rolls, Users) {
      $scope.rolls = Rolls;
      return $scope.createRoll = function(data) {
        return $scope.rolls.save(data);
      };
    }
  ]);

}).call(this);
