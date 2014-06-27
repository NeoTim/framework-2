(function() {
  angular.module('admin.service.blogs', []).service('Blogs', function(syncData) {
    var instance, _blogs, _drafts;
    _blogs = syncData('blogs');
    _drafts = syncData('drafts');
    instance = {
      get: function() {
        return _blogs;
      },
      save: function(data) {
        return _blogs.$add(data);
      },
      update: function(id, child, data) {
        return _blogs.$child(id).$child(child).$set(data);
      },
      destroy: function(id) {
        return _blogs.$remove(id);
      }
    };
    return instance;
  }).service('Comments', function(syncData) {
    var instance, _comments;
    _comments = syncData('comments');
    instance = {
      get: function() {
        return _comments;
      },
      save: function(data) {
        return _comments.$add(data);
      },
      update: function(id, child, data) {
        return _comments.$child(id).$child(child).$set(data);
      },
      destroy: function(id) {
        return _comments.$remove(id);
      }
    };
    return instance;
  });

}).call(this);
