angular.module('admin.service.users', [])

.service 'Users', (syncData)->
  _users = [
    { id: 1, username: "joelc", email: "joelcox@hisimagination.com", password: "091190", first: "Joel", last: "Cox" }
  ]
  users = syncData('uusers')
  instance =
    get: -> users
    save: (data)-> users.$add(data)
    update: (id, child, data)-> users.$child(id).$child(child).$set(data)
    destroy: (id)-> users.$remove(id)

  instance