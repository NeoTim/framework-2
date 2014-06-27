(function() {
  angular.module('admin.controller.users', []).controller('usersCtrl', [
    '$scope', 'Rolls', 'Users', 'syncData', function($scope, Rolls, Users, syncData) {
      $scope.users = Users;
      return $scope.createUser = function(data) {
        return $scope.users.save(data);
      };
    }
  ]);

}).call(this);
