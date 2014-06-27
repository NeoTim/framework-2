(function() {
  angular.module('admin.service.drafts', []).service('Drafts', function(syncData) {
    var instance, _drafts;
    _drafts = syncData('drafts');
    instance = {
      get: function() {
        return _drafts;
      },
      save: function(data) {
        return _drafts.$add(data);
      },
      update: function(id, child, data) {
        return _drafts.$child(id).$child(child).$set(data);
      },
      destroy: function(id) {
        return _drafts.$remove(id);
      }
    };
    return instance;
  });

}).call(this);
