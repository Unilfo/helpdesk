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
        avatar: String!
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
        path:String!
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

    type Mutation {
        createRole(title: String!): Roles!
        createStatusTask(title: String!): StatusTask!
        createStatusUser(title: String!): StatusUser!
        createInstraction(title: String! path:String!): Instraction!
        createTask(
            theme: String!
            responsible: Int!
            date: Date!
            status: Int!
            author: Int!
            text: String!
        ): Tasks!
        createUser(
            name: String!
            patronymic: String!
            surname: String!
            statusId: Int!
            tab_number: String!
            roleId: Int!
            login: String!
            password: String!
            avatar: String!
        ): User!
        deleteUser(id:Int!): String!
        deleteTask(id:Int!): String!
        updateInstraction(id:Int! title:String! path:String!): String!
        updateStatusUser(id:Int! title:String!): String!
        updateStatusTask(id:Int! title:String!): String!
        updateRole(id:Int! title:String!): String!
        updateUser(
            id:Int!
            name: String!
            patronymic: String!
            surname: String!
            statusId: Int!
            tab_number: String!
            roleId: Int!
            login: String!
            password: String!
            avatar: String!
        ): String!
        updateTask(
            id:Int!
            theme: String!
            responsible: Int!
            date: Date!
            status: Int!
            author: Int!
            text: String!
        ): String!
    }

`

module.exports = typeDefs
