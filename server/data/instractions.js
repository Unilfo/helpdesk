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
  return instractions.find(el => el.id ===  instractionId)
}

module.exports = {instractions, getInstractionById}
