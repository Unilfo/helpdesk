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

    type Priority {
        id: ID!
        title: String!
    }

    type Instraction {
        id: ID!
        title: String!
        name: String!
        path:String!
        belongs: Int!
        group: Boolean!
    }

    type Tasks {
        id: ID!
        theme: String!
        responsible: User!
        date: Date!
        priority: Priority!
        status: Boolean!
        author: User!
        text: String!
        answer : String!
    }
    type AuthPayLoad {
        message: String
        error: Boolean
        user: User
        token: String
        
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
        priority:[Priority!]
        getPriority(id:Int!):Priority
        tasks: [Tasks!]
        getTask(id: Int!): Tasks
        loginUser(login: String password: String token: String): AuthPayLoad!
    }

    type Mutation {
        createRole(title: String!): Roles!
        createPriority(title: String!): Priority!
        createStatusUser(title: String!): StatusUser!
        createInstraction(title: String! path:String! belongs: Int! group: Boolean! name: String!): Instraction!
        createTask(
            theme: String!
            responsible: Int!
            date: Date!
            status: Boolean!
            priority: Int!
            author: Int!
            text: String!
            answer : String!
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
        updateInstraction(id:Int! title:String! path:String! belongs: Int! group: Boolean! name: String!): String!
        updateStatusUser(id:Int! title:String!): String!
        updatePriority(id:Int! title:String!): String!
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
            status: Boolean!
            priority: Int!
            author: Int!
            text: String!
            answer : String!
        ): String!
    }
    
    type Subscription {
        UserCreated: User
    }
`

module.exports = typeDefs
