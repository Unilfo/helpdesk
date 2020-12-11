import {gql} from '@apollo/client'

const GetAllUsers = gql`
    query GetAllUsers{
        users{
            id
            name
            patronymic
            surname
            roleId{
                id
                title
            }
            statusId{
                id
                title
            }
            tab_number
            login
            password
            avatar
        }
    }
`

const ADD_USER = gql`
    mutation CreateUser(
        $name: String!
        $patronymic: String!
        $surname: String!
        $tab_number: String!
        $statusId: Int!
        $roleId: Int!
        $login: String!
        $password: String!
        $avatar: String!
    ) {
        createUser(
            name: $name,
            patronymic: $patronymic,
            surname: $surname,
            statusId: $statusId,
            roleId: $roleId,
            tab_number: $tab_number,
            login: $login,
            password: $password,
            avatar: $avatar
        ){
            id
        }

    }
`

const UPDATE_USER = gql`
    mutation UpdateUser(
        $id:Int!
        $name: String!
        $patronymic: String!
        $surname: String!
        $tab_number: String!
        $statusId: Int!
        $roleId: Int!
        $login: String!
        $password: String!
        $avatar: String!
    ) {
        updateUser(
            id:$id,
            name: $name,
            patronymic: $patronymic,
            surname: $surname,
            statusId: $statusId,
            roleId: $roleId,
            tab_number: $tab_number,
            login: $login,
            password: $password,
            avatar: $avatar
        )
    }
`

const DELETE_USER = gql`
    mutation DeleteUser(
        $id:Int!
    ) {
        deleteUser(
            id:$id,
        )
    }
`

export {GetAllUsers,ADD_USER,UPDATE_USER, DELETE_USER}
