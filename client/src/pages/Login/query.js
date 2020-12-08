import {gql} from '@apollo/client'

const LOGIN = gql`
    mutation LOGIN($login: String, $password: String $token: String){
        loginUser(login:$login password: $password token:$token){
            message
            error
            user{
                id
                name
                login
            }
            token
        }
    }
`

export {LOGIN}
