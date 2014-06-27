angular.module('rooms', [])
.service('Rooms', (syncData, Messages) ->
  _rooms = syncData('/rooms')
  rooms = {}
  roomInstance = {}
  roomInstance.get = (uid)->
    roomInstance.getByUserId( _rooms, roomID )
  getByUserId = (rooms, roomID)->
    rooms[roomID]['users']


)