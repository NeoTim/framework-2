(function() {
  angular.module('app.fire.filters', []).filter('interpolate', [
    'version', function(version) {
      return function(text) {
        return String(text).replace(/\%VERSION\%/mg, version);
      };
    }
  ]).filter('reverse', function() {
    var toArray;
    toArray = function(list) {
      var k, out, _i, _len;
      k = void 0;
      out = [];
      if (list) {
        if (angular.isArray(list)) {
          out = list;
        } else if (typeof list === 'object') {
          for (_i = 0, _len = list.length; _i < _len; _i++) {
            k = list[_i];
            if (list.hasOwnProperty(k)) {
              out.push(list[k]);
            }
          }
        }
      }
      return out;
    };
    return function(items) {
      return toArray(items).slice().reverse();
    };
  });

}).call(this);
