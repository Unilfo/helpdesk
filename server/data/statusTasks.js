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
  return statusTasks.find((el)=>el.id === statusId)
}

module.exports = {statusTasks, getStatusTasksById}
