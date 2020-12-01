const {ApolloServer} = require('apollo-server')
const resolvers = require('./data/resolvers')
const typeDefs = require('./data/typeDefs')
const models = require('./models')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context:{models}
})

server.listen().then(({url}) => {
  console.log(`🚀  Server ready at ${url}`)
})
