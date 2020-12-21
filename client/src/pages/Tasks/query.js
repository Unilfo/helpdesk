import {gql} from '@apollo/client'

const GetAllTasks = gql`
    query GetAllTasks{
        tasks{
            id
            theme
            responsible{
                id
                name
            }
            status
            priority{
                id
                title
            }
            author{
                id
                name
            }
            date
            text
        }
    }
`
const ADD_TASK = gql`
    mutation CreateTask(
        $theme: String!
        $responsible: Int!
        $date: Date!
        $status: Boolean!
        $priority: Int!
        $author: Int!
        $text: String!
    ) {
        createTask(
            theme: $theme
            responsible: $responsible
            date: $date
            status:$status
            priority: $priority
            author: $author
            text: $text
        ){
            id
        }

    }
`

const UPDATE_TASK = gql`
    mutation UpdateTask(
        $id: Int!
        $theme: String!
        $responsible: Int!
        $date: Date!
        $status: Boolean!
        $priority: Int!
        $author: Int!
        $text: String!
    ) {
        updateTask(
            id: $id
            theme: $theme
            responsible: $responsible
            date: $date
            status:$status
            priority: $priority
            author: $author
            text: $text
        )
    }
`

export {GetAllTasks, UPDATE_TASK, ADD_TASK}
