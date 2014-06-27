(function() {
  angular.module('admin.controller.ideas', []).controller('ideasCtrl', [
    '$scope', 'Ideas', function($scope, Ideas) {
      return $scope.ideas = Ideas;
    }
  ]);

}).call(this);
