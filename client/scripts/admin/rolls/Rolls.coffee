angular.module('admin.service.rolls', [])


.service 'Rolls', (syncData)->
  # _rolls = [
  #   {id:1, title: "Super User", type: "super"}
  #   {id:2, title: "Admin", type: "admin"}
  #   {id:3, title: "User", type: "user"}
  #   {id:4, title: "Member", type: "member"}
  # ]
  _rolls = syncData('rolls')
  instance = {}
  instance.get = ->
    _rolls
  instance.save = (data)->
    # _rolls.push(data)
    _rolls.$add(data)
  instance.update = (id, child, data)->
    # _rolls[index] = data
    _rolls.$child(id).$child(child).$set(data)
  instance.destroy = (id)->
    # _rolls.splice(index, 1)
    _rolls.$remove(id)

  instance