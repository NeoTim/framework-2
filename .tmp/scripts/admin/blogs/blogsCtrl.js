(function() {
  angular.module('admin.controller.blogs', []).controller('blogsCtrl', [
    '$scope', 'Blogs', function($scope, Blogs) {
      $scope.blogs = Blogs;
      return console.log($scope.blogs);
    }
  ]);

}).call(this);
