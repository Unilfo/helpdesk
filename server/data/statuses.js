const statuses = [
  {
    id: 1,
    title: 'действует',
  },
  {
    id: 2,
    title: 'не действует',
  },
]

const getStatusById = ({statusId}) => {
  return statuses.find((el)=> el.id == statusId)
}

const addStatuses = (id, title) => {
  const item = {
    id:id,
    title:title
  }
  statuses.push(item)
  return item
}

const deleteStatuses = (id) => {
  return statuses.filter(el => el.id != id)
}

const updateStatuses = (id, title) => {
  let newStatus = getStatusById({statusId: id})
  newStatus.title = title
  return newStatus
}

module.exports = {statuses, getStatusById, addStatuses, deleteStatuses, updateStatuses}
