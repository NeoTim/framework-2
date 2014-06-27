(function() {
  angular.module('admin.controller.createBlog', []).controller('createBlogCtrl', [
    '$scope', 'Drafts', 'Blogs', '$location', function($scope, Drafts, Blogs, $location) {
      $scope.drafts = Drafts;
      $scope.blogs = Blogs;
      $scope.publishBlog = function(data) {
        data.createdAt = new Date();
        data.author = "Joel Cox";
        Blogs.save(data);
        return $location.path('/admin/blogs');
      };
      return $scope.createDraft = function(data) {
        data.createdAt = new Date();
        data.author = "Joel Cox";
        console.log(data);
        $scope.drafts.save(data);
        return $location.path('/admin/blogs');
      };
    }
  ]);

}).call(this);
