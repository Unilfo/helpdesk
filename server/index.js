const { ApolloServer, gql } = require('apollo-server');

const users = require('./data/users')
const {roles, getRoleById} = require('./data/roles')
const {statuses, getStatusById} = require('./data/statuses')

const typeDefs = gql`  
    type User {
        id: ID!
        name: String
        patronymic: String
        surname: String
        status: Statuses
        role: Roles
        tab_number: String
        date: String
        login: String
        password: String
    }
    
    type Roles {
        id: ID!
        title: String
    }

    type Statuses {
        id: ID!
        title: String
    }
    
    type Query {
        users: [User]
        roles: [Roles]
        statuses: [Statuses]
        role(id: ID!): Roles,
        status(id: ID!): Statuses,
    }
`;


const resolvers = {
  Query: {
    users: () => users,
    roles: () => roles,
    statuses: () => statuses,
    role: (_, { id }) => getRoleById({ roleId: id }),
    status: (_, {id}) => getStatusById({statusId: id})
  },
  User: {
    role: role => getRoleById({ roleId: role.id }),
    status: status => getStatusById({statusId : status.id})
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
