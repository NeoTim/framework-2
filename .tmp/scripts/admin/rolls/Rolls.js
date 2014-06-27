(function() {
  angular.module('admin.service.rolls', []).service('Rolls', function(syncData) {
    var instance, _rolls;
    _rolls = syncData('rolls');
    instance = {};
    instance.get = function() {
      return _rolls;
    };
    instance.save = function(data) {
      return _rolls.$add(data);
    };
    instance.update = function(id, child, data) {
      return _rolls.$child(id).$child(child).$set(data);
    };
    instance.destroy = function(id) {
      return _rolls.$remove(id);
    };
    return instance;
  });

}).call(this);
