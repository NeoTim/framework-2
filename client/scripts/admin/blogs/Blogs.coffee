angular.module('admin.service.blogs', [])


.service('Blogs', (syncData)->

  _blogs = syncData('blogs')
  _drafts = syncData('drafts')

  instance =
    get: -> return _blogs
    save: (data)-> _blogs.$add(data)
    update: (id, child, data)-> _blogs.$child(id).$child(child).$set(data)
    destroy: (id)-> _blogs.$remove(id)

  return instance
)

.service('Comments', (syncData)->
  _comments = syncData('comments')

  instance =
    get: -> _comments
    save: (data)-> _comments.$add(data)
    update: (id, child, data)-> _comments.$child(id).$child(child).$set(data)
    destroy: (id)-> _comments.$remove(id)

  return instance
)

