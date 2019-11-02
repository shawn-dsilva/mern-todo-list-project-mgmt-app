import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import { isAuth } from '../actions/authActions'

function ProtectedRoute ({component: Component, isAuthenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if(isAuthenticated === true) {
          console.log(props);
          const loc = props.location.pathname;
          console.log(loc);
          if ((loc === '/' || loc === '/login' || loc === '/register') && props.location.state === undefined) {
            //Redirects all routes that are root /, /login or /register to /listpage if there are no previous routes in state
            return <Redirect to={{pathname: '/listpage', state: props.location}} />
          } else {
            return <Redirect to={{pathname: props.location.state.from.pathname, state: props.location}} />
          }
        } else {
        return <Component {...props} />
        }
        }}
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