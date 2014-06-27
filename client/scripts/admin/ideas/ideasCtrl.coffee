angular.module('admin.controller.ideas', [])

.controller('ideasCtrl', [
  '$scope'
  'Ideas'
  ($scope, Ideas)->

    $scope.ideas = Ideas;
])