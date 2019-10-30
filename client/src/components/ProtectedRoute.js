import React, {Component} from 'react';  
import { Route, Redirect } from 'react-router-dom'
import { connect } from "react-redux";



const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    this.props.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps)(ProtectedRoute);