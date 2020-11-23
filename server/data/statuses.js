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
  return statuses.find((el)=>el.id === statusId)
}

module.exports = {statuses, getStatusById}
