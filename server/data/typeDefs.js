const { gql } = require('apollo-server')

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

    type Instractions {
        id: ID!
        title: String
        path: String
    }

    type Tasks {
        id: ID!
    }
    
    type Query {
        users: [User]
        roles: [Roles]
        statuses: [Statuses]
        tasks: [Tasks]
        instractions: [Instractions]
        instraction(id: ID!): Instractions
        task(id: ID!): Tasks
        role(id: ID!): Roles
        status(id: ID!): Statuses
    }
`;

module.exports = typeDefs
