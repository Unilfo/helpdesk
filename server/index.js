const {ApolloServer, PubSub } = require('apollo-server')
const resolvers = require('./data/resolvers')
const typeDefs = require('./data/typeDefs')
const models = require('./models')

const pubsub = new PubSub()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context:({models, pubsub})
})

server.listen().then(({url}) => {
  console.log(`🚀  Server ready at ${url}`)
})

module.exports = pubsub
