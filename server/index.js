const {ApolloServer} = require('apollo-server')
const connection = require('./db/connection')
const executeStatement = require('./db/query')
const resolvers = require('./data/resolvers')
const typeDefs = require('./data/typeDefs')

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
  connection.on('connect', function (err) {

    console.log('Connected to db')

    executeStatement('*', 'Departments').then(result => {
      console.log('DATA ', result)
    }).catch(err => {
      console.log(err)
    })
  })

  console.log(`🚀  Server ready at ${url}`)
})
