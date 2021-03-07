export const FIELDS = {
  ID: 'idx',
  title: 'title',
  description: 'description',
  dueDate: 'dueDate',
  piority: 'piority'
}

export const PIORITY_OPTION = [
  { value: 1, text: 'Low' },
  { value: 2, text: 'Normal' },
  { value: 3, text: 'High' }
]

export const DEFAULT_DATA = {
  title: '',
  description: '',
  dueDate: new Date().toISOString().substr(0, 10),
  piority: 2
}

export const DEFAULT_RULES = {
  title: {
    canShow: false,
    msg: 'Required'
  },
  dueDate: {
    canShow: false,
    msg: 'Selected date must be greater than today date'
  }
}
