// import {useQuery} from '@apollo/client'
// import {LOGIN} from '../Login/query'
// import Dashboard from '../Dashboard/Dashboard'
// import React, {useEffect, useState} from 'react'
// import {Redirect} from 'react-router-dom'
// import FetchAuth from './fetchAuth'
//
//
// export default function PrivateRoute({children}) {
//
//   const {loading, data, error} = FetchAuth('z', 'z')
//   const [user, setUser] = useState(null)
//
//   useEffect(() => {
//     const onCompleted = ({loginUser}) => {
//       console.log('user', loginUser)
//       setUser(loginUser)
//     }
//     const onError = (error) => {
//       console.log('error', error)
//     }
//     if (onCompleted || onError) {
//       if (onCompleted && !loading && !error) {
//         onCompleted(data)
//       } else if (onError && !loading && error) {
//         onError(error)
//       }
//     }
//   }, [loading, data, error])
//
//
//
//   return (
//     <div>
//       {children}
//     </div>
//   )
// }
