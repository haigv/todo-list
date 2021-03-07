export const LOCAL_STORAGE_KEY = {
  TODO_LIST: 'todo_list',
  ID: 'idx'
}

export function getValueFromStorageByKey(key) {
  return JSON.parse(localStorage.getItem(key))
}

export function setValueToStorageByKey(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
