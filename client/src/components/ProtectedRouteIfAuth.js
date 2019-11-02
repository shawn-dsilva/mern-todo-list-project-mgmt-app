import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import { isAuth } from '../actions/authActions'

function ProtectedRoute ({component: Component, isAuthenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated === true
        ? <div>{console.log(props)}<Redirect to={{pathname: props.location.state.from.pathname, state: {from: props.location}}} /></div>
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