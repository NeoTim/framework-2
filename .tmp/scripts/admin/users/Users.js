(function() {
  angular.module('admin.service.users', []).service('Users', function(syncData) {
    var instance, users, _users;
    _users = [
      {
        id: 1,
        username: "joelc",
        email: "joelcox@hisimagination.com",
        password: "091190",
        first: "Joel",
        last: "Cox"
      }
    ];
    users = syncData('uusers');
    instance = {
      get: function() {
        return users;
      },
      save: function(data) {
        return users.$add(data);
      },
      update: function(id, child, data) {
        return users.$child(id).$child(child).$set(data);
      },
      destroy: function(id) {
        return users.$remove(id);
      }
    };
    return instance;
  });

}).call(this);
