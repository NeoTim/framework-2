(function() {
  'use strict';
  angular.module('app.stores', []).controller('storesCtrl', [
    '$scope', '$filter', 'syncData', function($scope, $filter, syncData) {
      var init;
      $scope["new"] = {};
      $scope.searchKeywords = '';
      $scope.filteredStores = [];
      $scope.row = '';
      $scope.stores = syncData('data1');
      $scope.select = function(page) {
        var end, start;
        start = (page - 1) * $scope.numPerPage;
        end = start + $scope.numPerPage;
        return $scope.currentPageStores = $scope.filteredStores.slice(start, end);
      };
      $scope.addStore = function(v) {
        $scope.stores.$add({
          name: v.name,
          price: v.price,
          sales: v.sales,
          rating: v.rating
        });
        $scope["new"] = {};
        return $scope.showNew = false;
      };
      $scope.removeStore = function(id) {
        console.log(id);
        return $scope.stores.$child(id).$remove();
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
      init = function() {};
      return $scope.stores.$on('loaded', function() {
        return init();
      });
    }
  ]).controller('helloCtrl', function($scope) {
    $scope.student = "Joel Cox";
    return $scope.changeStudent = function() {
      return $scope.student = "Loqi Park";
    };
  });

}).call(this);
