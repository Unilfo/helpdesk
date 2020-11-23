const tasks = [
  {
    id: 1,
  },
  {
    id: 2,
  },
]

const getTaskById = ({taskId}) => {
  return tasks.find(el => el.id === taskId)
}

module.exports = {tasks, getTaskById}
