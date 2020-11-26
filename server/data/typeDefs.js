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
        theme: String
        responsible: User
        data: String
        status: StatusTasks
        author: User
        text: String
    }

    type StatusTasks {
        id: ID!
        title: String
    }
    
    type Query {
        users: [User]
        roles: [Roles]
        statuses: [Statuses]
        tasks: [Tasks]
        instractions: [Instractions]
        instraction(id: ID!): Instractions
        user(id: ID!): User
        task(id: ID!): Tasks
        role(id: ID!): Roles
        status(id: ID!): Statuses
        statusTasks: [StatusTasks]
        statusTask(id: ID!): StatusTasks
    }
    
    type Mutation {
        addRoles(id: ID!, title: String!): Roles!
        addStatuses(id: ID!, title: String!): Statuses!
        addStatusTasks(id: ID!, title: String!): StatusTasks!
        addInstraction(id: ID!, title: String!, path: String!): Instractions!
        addUser(
            id: ID!
            name: String
            patronymic: String
            surname: String
            status: ID
            role: ID
            tab_number: String
            date: String
            login: String
            password: String
        ):User
        addTask(
            id: ID!
            theme: String
            responsible: ID
            data: String
            status: ID
            author: ID
            text: String
        ): Tasks
    }
  
`;

module.exports = typeDefs
