(function() {
  'use strict';
  angular.module('app.tables', []).controller('tableCtrl', [
    '$scope', '$filter', function($scope, $filter) {
      var fire, init;
      $scope.stores = [];
      fire = new Firebase('http://my-data-test.firebaseio.com/tests/data1');
      $scope["new"] = {};
      $scope.searchKeywords = '';
      $scope.filteredStores = [];
      $scope.row = '';
      $scope.select = function(page) {
        var end, start;
        start = (page - 1) * $scope.numPerPage;
        end = start + $scope.numPerPage;
        return $scope.currentPageStores = $scope.filteredStores.slice(start, end);
      };
      $scope.addStore = function(v) {
        fire.push({
          name: v.name,
          price: v.price,
          sales: v.sales,
          rating: v.rating
        });
        $scope["new"] = {};
        return $scope.showNew = false;
      };
      $scope.removeStore = function(id) {
        return fire.child(id).remove();
      };
      $scope.onFilterChange = function() {
        $scope.select(1);
        $scope.currentPage = 1;
        return $scope.row = '';
      };
      $scope.onNumPerPageChange = function() {
        $scope.select(1);
        return $scope.currentPage = 1;
      };
      $scope.onOrderChange = function() {
        $scope.select(1);
        return $scope.currentPage = 1;
      };
      $scope.search = function() {
        $scope.filteredStores = $filter('filter')($scope.stores, $scope.searchKeywords);
        return $scope.onFilterChange();
      };
      $scope.order = function(rowName) {
        if ($scope.row === rowName) {
          return;
        }
        $scope.row = rowName;
        $scope.filteredStores = $filter('orderBy')($scope.stores, rowName);
        return $scope.onOrderChange();
      };
      $scope.numPerPageOpt = [3, 5, 10, 20];
      $scope.numPerPage = $scope.numPerPageOpt[2];
      $scope.currentPage = 1;
      $scope.currentPageStores = [];
      init = function() {
        $scope.search();
        $scope.select($scope.currentPage);
        return $("#clicker").click();
      };
      fire.on('child_added', function(snapshot) {
        var obj;
        obj = snapshot.val();
        obj.id = snapshot.name();
        $scope.stores.push(obj);
        return init();
      });
      fire.on('child_removed', function(snapshot) {
        return _.each($scope.stores, function(item, index) {
          if (item.id === snapshot.name()) {
            return $scope.stores.splice(index, 1);
          }
        });
      });
      return init();
    }
  ]);

}).call(this);
