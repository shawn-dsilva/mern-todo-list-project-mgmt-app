import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import { isAuth } from '../actions/authActions'

function ProtectedRoute ({component: Component, isAuthenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated === true
        ? <Redirect to={{pathname: '/listpage', state: {from: props.location}}} />
        :  <Component {...props} />}
    />
  )
}

// function ProtectedRoute({ children, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         this.props.isAuthenticated ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: location }
//             }}
//           />
//         )
//       }
//     />
//   );
// }

export default ProtectedRoute;