'use strict'

angular.module('app.stores', [])

.controller('storesCtrl', [
  '$scope'
  '$filter'
  'syncData'
  ($scope, $filter, syncData) ->


    $scope.new = {};
    $scope.searchKeywords = ''
    $scope.filteredStores = []
    $scope.row = ''
    $scope.stores = syncData('data1')

    $scope.select = (page) ->
      start = (page - 1) * $scope.numPerPage
      end = start + $scope.numPerPage
      $scope.currentPageStores = $scope.filteredStores.slice(start, end)

    # on page change: change numPerPage, filtering string
    $scope.addStore = (v)->
      # if(v){
      # fire.push({name: v.name, price:v.price, sales: v.sales, rating: v.rating});
      $scope.stores.$add({name: v.name, price:v.price, sales: v.sales, rating: v.rating});
      # console.log(v)
      $scope.new = {};
      $scope.showNew = false
    # }
    $scope.removeStore = (id)->
      console.log(id)
      $scope.stores.$child(id).$remove();
    $scope.onFilterChange = ->
      $scope.select(1)
      $scope.currentPage = 1
      $scope.row = ''

    $scope.onNumPerPageChange = ->
      $scope.select(1)
      $scope.currentPage = 1

    $scope.onOrderChange = ->
      $scope.select(1)
      $scope.currentPage = 1


    $scope.search = ->
      $scope.filteredStores = $filter('filter')($scope.stores, $scope.searchKeywords)
      $scope.onFilterChange()

    # orderBy
    $scope.order = (rowName)->
      if $scope.row is rowName
        return
      $scope.row = rowName
      $scope.filteredStores = $filter('orderBy')($scope.stores, rowName)
      # console.log $scope.filteredStores
      $scope.onOrderChange()

    # pagination
    $scope.numPerPageOpt = [3, 5, 10, 20]
    $scope.numPerPage = $scope.numPerPageOpt[2]
    $scope.currentPage = 1
    $scope.currentPageStores = []

    # init
    init = ->
      # $scope.search()
      # $scope.select($scope.currentPage)
      # $("#clicker").click();

    #  fire.on 'child_added', (snapshot)->
    #     # if snapshot.name() is 'data1' then $scope.stores = snapshot.val();
    #     obj = snapshot.val();
    #     obj.id = snapshot.name();
    #     $scope.stores.push(obj)
    #     init()
    # fire.on 'child_removed', (snapshot)->
    #     _.each $scope.stores, (item, index)->
    #         if item.id is snapshot.name()
    #             $scope.stores.splice(index, 1)
    $scope.stores.$on 'loaded', ->
      init()

    # init()


])

.controller 'helloCtrl', ($scope)->
    $scope.student = "Joel Cox"
    $scope.changeStudent = ->
        $scope.student = "Loqi Park"



