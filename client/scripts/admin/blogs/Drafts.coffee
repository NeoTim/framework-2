angular.module('admin.service.drafts', [])


.service('Drafts', (syncData)->
  _drafts = syncData('drafts')

  instance =
    get: -> _drafts
    save: (data)-> _drafts.$add(data)
    update: (id, child, data)-> _drafts.$child(id).$child(child).$set(data)
    destroy: (id)-> _drafts.$remove(id)

  return instance
)
