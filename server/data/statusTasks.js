const statusTasks = [
  {
    id: 1,
    title: 'действует',
  },
  {
    id: 2,
    title: 'не действует',
  },
]

const getStatusTasksById = ({statusId}) => {
  return statusTasks.find((el)=>el.id == statusId)
}

const addStatusTasks = (id, title) => {
  const item = {
    id:id,
    title:title
  }
  statusTasks.push(item)
  return item
}

module.exports = {statusTasks, getStatusTasksById, addStatusTasks}
