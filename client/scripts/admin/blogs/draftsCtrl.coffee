angular.module('admin.controller.drafts', [])

.controller('draftsCtrl', [
  '$scope'
  'Drafts'
  'Blogs'
  ($scope, Drafts, Blogs)->

    $scope.drafts = Drafts

])