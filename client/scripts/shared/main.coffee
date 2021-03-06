'use strict';

angular.module('app.controllers', [])

# overall control
.controller('AppCtrl', [
  '$scope', '$location'
  ($scope, $location) ->
    $scope.isSpecificPage = ->
      path = $location.path()
      return _.contains( [
        '/404'
        '/pages/500'
        '/pages/login'
        '/pages/signin'
        '/pages/signin1'
        '/pages/signin2'
        '/pages/signup'
        '/pages/signup1'
        '/pages/signup2'
        '/pages/forgot'
        '/pages/lock-screen'
      ], path )

    $scope.main =
      brand: 'Square'
      name: 'Lisa Doe' # those which uses i18n can not be replaced for now.
])

.controller('NavCtrl', [
  '$scope', 'taskStorage', 'filterFilter'
  ($scope, taskStorage, filterFilter) ->
    # init
    tasks = $scope.tasks = taskStorage.get()
    $scope.taskRemainingCount = filterFilter(tasks, {completed: false}).length

    $scope.$on('taskRemaining:changed', (event, count) ->
      $scope.taskRemainingCount = count
    )
])

.controller('DashboardCtrl', [
  '$scope',
  ($scope ) ->

    fire = new Firebase 'http://my-data-test.firebaseio.com/tests'
    fire.on 'child_added', (snapshot)->
      if snapshot.name() is 'data1' then $scope.orders = snapshot.val()
      console.log($scope.orders)

        # $scope.orders = syncData('data1')

        # $scope.creatOrder = (v)->
        #     $scope.orders.$add(v)

        # $scope.updateOrder = (child, v, id)->
        #     $scope.orders.$child(id).$child(child).set(v)

        # $scope.removeOrder = (id)->
        #     $scope.orders.$child(id).$remove()

])







