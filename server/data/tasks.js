const tasks = [
  {
    id: 1,
    theme:'1',
    responsible:1,
    data:'1',
    status:1,
    author:1,
    text:'1',
  },
  {
    id: 2,
    theme:'2',
    responsible:2,
    data:'2',
    status:1,
    author:2,
    text:'2',
  },
]

const getTaskById = ({taskId}) => {
  return tasks.find(el => el.id == taskId)
}

const addTask = (
  id,
  theme,
  responsible,
  data,
  status,
  author,
  text,
) => {
  const item = {
    id:id,
    theme:theme,
    responsible:responsible,
    data:data,
    status:status,
    author:author,
    text:text,
  }
  tasks.push(item)
  return item
}

const deleteTask = (id) => {
  return tasks.filter(el => el.id != id)
}

const updateTask = (id, theme, responsible, data, status, author, text) => {
  let newTask = getTaskById({taskId: id})
  newTask.theme = theme
  newTask.responsible = responsible
  newTask.data = data
  newTask.status = status
  newTask.author = author
  newTask.text = text
  return newTask
}

module.exports = {tasks, getTaskById, addTask, deleteTask, updateTask}
