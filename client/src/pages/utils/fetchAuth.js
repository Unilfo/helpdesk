// import {useQuery} from '@apollo/client'
//
// const {LOGIN} = require('../Login/query')
//
// const getToken = () => {
//   return localStorage.getItem('token')
// }
//
// const Login = async () => {
//   const {loading, error, data} = await useQuery(LOGIN, {
//     variables: {
//       login: 'z',
//       password: 'z',
//       token: '',
//     },
//   })
//   return [loading, error, data]
// }
//
// export default {getToken, Login}
