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
            answer
            files{
                id
                data
                name
                task_id
            }
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
        $answer: String
    ) {
        createTask(
            theme: $theme
            responsible: $responsible
            date: $date
            status:$status
            priority: $priority
            author: $author
            text: $text      
            answer: $answer
        ){
            id
        }

    }
`

const CREATE_FILE = gql`
    mutation CreateFile(
        $task_id: Int!
        $name: String!
        $data: String!
    ) {
        createFile(
         task_id: $task_id
            name: $name
            data: $data
        ){
            id
            task_id
            name
            data
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
        $answer: String
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
            answer: $answer
        )
    }
`

const DELETE_FILES = gql`
    mutation DeleteFiles(
        $task_id: Int!
    ) {
        deleteFiles(
        task_id: $task_id
        )
    }
`

export {GetAllTasks, UPDATE_TASK, ADD_TASK, CREATE_FILE, DELETE_FILES}
