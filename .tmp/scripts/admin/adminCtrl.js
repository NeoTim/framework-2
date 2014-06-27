(function() {
  angular.module('app.admin', ['admin.service.rolls', 'admin.service.users', 'admin.service.drafts', 'admin.service.blogs', 'admin.service.ideas', 'admin.controller.drafts', 'admin.controller.users', 'admin.controller.rolls', 'admin.controller.blogs', 'admin.controller.ideas', 'admin.controller.createBlog']).controller('adminCtrl', ['$scope', 'syncData', function($scope, syncData) {}]);

}).call(this);
