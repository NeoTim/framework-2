# 'use strict'

# /* Filters */

angular.module('app.fire.filters', [])

.filter('interpolate', [
  'version'
  (version)->
    return (text)->
      String(text).replace /\%VERSION\%/mg, version

]).filter('reverse', ->
  toArray = (list)->
    # var k, out = []
    k = undefined
    out = []
    if list
      if angular.isArray(list)
        out = list
      else if typeof(list) is 'object'
        for k in list
          out.push list[k] if list.hasOwnProperty(k)
    out
  (items)->
    toArray(items).slice().reverse()
)
