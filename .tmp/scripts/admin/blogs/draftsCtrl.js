(function() {
  angular.module('admin.controller.drafts', []).controller('draftsCtrl', [
    '$scope', 'Drafts', 'Blogs', function($scope, Drafts, Blogs) {
      return $scope.drafts = Drafts;
    }
  ]);

}).call(this);
