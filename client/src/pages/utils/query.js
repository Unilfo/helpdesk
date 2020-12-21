import {gql} from '@apollo/client'

const LOGIN = gql`
    query LOGIN($login: String, $password: String $token: String){
        loginUser(login:$login password: $password token:$token){
            message
            error
            user{
                id
                name
                login
                surname
                tab_number
                avatar
            }
            token
        }
    }
`

export {LOGIN}
