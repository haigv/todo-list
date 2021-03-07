import {
  getValueFromStorageByKey,
  setValueToStorageByKey,
  LOCAL_STORAGE_KEY
} from '@/utils/localStorage'

class ApiService {
  addTodo(params) {
    const existing = getValueFromStorageByKey(LOCAL_STORAGE_KEY.TODO_LIST) || []
    let id = getValueFromStorageByKey(LOCAL_STORAGE_KEY.ID) || 0

    id++
    existing.push({ id: id, ...params })
    setValueToStorageByKey(LOCAL_STORAGE_KEY.ID, id)
    setValueToStorageByKey(LOCAL_STORAGE_KEY.TODO_LIST, existing)
    return existing
  }

  getTodoList() {
    return getValueFromStorageByKey(LOCAL_STORAGE_KEY.TODO_LIST) || []
  }

  updateTodo(params) {
    const existing = getValueFromStorageByKey(LOCAL_STORAGE_KEY.TODO_LIST) || []
    const foundIndex = existing.findIndex(x => x.id === params.id)
    const updateTodo = { id: existing[foundIndex].id, ...params.data }

    existing[foundIndex] = updateTodo
    setValueToStorageByKey(LOCAL_STORAGE_KEY.TODO_LIST, existing)
    return existing
  }

  removeTodo(removeItem) {
    let existing = getValueFromStorageByKey(LOCAL_STORAGE_KEY.TODO_LIST) || []

    existing = existing.filter(function(item) {
      return removeItem.indexOf(item.id) < 0
    })
    setValueToStorageByKey(LOCAL_STORAGE_KEY.TODO_LIST, existing)
    return existing
  }
}

export default new ApiService()
