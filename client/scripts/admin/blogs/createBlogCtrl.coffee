angular.module('admin.controller.createBlog', [])

.controller('createBlogCtrl', [
  '$scope'
  'Drafts'
  'Blogs'
  '$location'
  ($scope, Drafts, Blogs, $location)->

    $scope.drafts = Drafts
    $scope.blogs  = Blogs
    $scope.publishBlog = (data)->
      data.createdAt = new Date()
      data.author    = "Joel Cox"
      Blogs.save(data)
      $location.path '/admin/blogs'

    $scope.createDraft = (data)->
      data.createdAt = new Date()
      data.author    = "Joel Cox"
      console.log data
      $scope.drafts.save(data)
      $location.path '/admin/blogs'

])