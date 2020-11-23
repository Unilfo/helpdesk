const { ApolloServer, gql } = require('apollo-server');

const users = require('./data/users')
const roles = require('./data/roles')
const status = require('./data/status')

const typeDefs = gql`  
    type User {
        id: Int!
        name: String
        patronymic: String
        surname: String
        status: Status
        role: Role
        tab_number: String
        login: String
        password: String
    }
    
    type Role {
        id: Int!
        title: String
    }

    type Status {
        id: Int!
        title: String
    }
    
    type Query {
        users: [User]
        roles: [Role]
        status: [Status]
        role(id: Int!): Role,
    }
`;


const resolvers = {
  Query: {
    users: () => users,
    roles: () => roles,
    status: () => status,
    role: (_, { id }) => roles.find(id, { id }),
  },
  // Role: {
  //   posts: author => filter(posts, { authorId: author.id }),
  // },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
