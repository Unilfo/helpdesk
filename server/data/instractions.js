const instractions = [
  {
    id: 1,
    title: 'asd',
    path: 'aaa',
  },
  {
    id: 2,
    title: 'asd2',
    path: 'aaa2',
  },
]

const getInstractionById = ({instractionId}) => {
  return instractions.find(el => el.id == instractionId)
}

const addInstraction = (id, title, path) => {
  const item = {
    id: id,
    title: title,
    path: path
  }
  instractions.push(item)
  return item
}

const deleteInstraction = (id) => {
  return instractions.filter(el => el.id != id)
}

const updateInstraction = (id, title , path) => {
  let newInstraction = getInstractionById({instractionId: id})
  newInstraction.title = title
  newInstraction.path = path
  return newInstraction
}


module.exports = {instractions, getInstractionById, addInstraction, deleteInstraction, updateInstraction}
