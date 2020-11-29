const {gql} = require('apollo-server')

const typeDefs = gql`
    scalar Date
    
    type User {
        id: ID!
        name: String!
        patronymic: String!
        surname: String!
        statusId: StatusUser!
        tab_number: String!
        roleId: Roles!
        login: String!
        password: String!
    }

    type Roles {
        id: ID!
        title: String!
    }

    type StatusUser {
        id: ID!
        title: String!
    }

    type StatusTask {
        id: ID!
        title: String!
    }

    type Instraction {
        id: ID!
        title: String!
    }
    
    type Tasks {
        id: ID!
        theme: String!
        responsible: User!
        date: Date!
        status: StatusTask!
        author: User!
        text: String!
    }
    
    type Query {
        users: [User!]
        getUserById(id:Int!):User
        roles: [Roles!]
        getRole(id:Int!): Roles
        statusUser:[StatusUser!]
        getStatusUser(id:Int!):StatusUser
        instraction: [Instraction!]
        getInstraction(id:Int!): Instraction
        statusTask:[StatusTask!]
        getStatusTask(id:Int!):StatusTask
        tasks: [Tasks!]
        getTask(id: Int!): Tasks
    }

`

module.exports = typeDefs
