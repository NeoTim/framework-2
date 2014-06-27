angular.module('admin.controller.blogs', [])

.controller( 'blogsCtrl', [
  '$scope'
  'Blogs'
  ($scope, Blogs)->
    $scope.blogs = Blogs
    console.log($scope.blogs)

])