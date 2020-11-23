const { ApolloServer, gql } = require('apollo-server')

const resolvers = require('./data/resolvers')
const typeDefs = require('./data/typeDefs')

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
