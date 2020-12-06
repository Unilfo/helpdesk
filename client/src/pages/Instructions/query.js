import {gql} from '@apollo/client'

const GetAllInstractions = gql`
    query GetAllInstractions{
        instraction{
            id
            title
            path
            belongs
            group
            name
        }
    }
`
const ADD_INSTRACTION = gql`
    mutation CreateInstraction(
        $title: String!
        $path: String!
        $belongs: Int!
        $group: Boolean!
        $name: String!
    ) {
        createInstraction(
            title: $title,
            path: $path,
            belongs: $belongs,
            group: $group,
            name: $name
        ){
            id
            title
            path
            belongs
            group
            name
        }

    }
`

export {GetAllInstractions,ADD_INSTRACTION}
