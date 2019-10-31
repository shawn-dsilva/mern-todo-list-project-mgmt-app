import React, { Component } from "react";
import { connect } from "react-redux";
import { isAuth } from "../actions/authActions";
import HomePage from '../components/HomePage';
import Profile from '../components/Profile';
import ListPage from '../components/ListPage';
import SingleList from '../components/SingleList';
import { Route, Switch} from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute';
import ProtectedRouteIfAuth from '../components/ProtectedRouteIfAuth';

import store from '../store';

export class AuthService extends Component {
  // authChecker = () => {
  //   isAuth().then(() => {
  //     // if(this.props.isAuthenticated === true ) {
  //     //   const isAuthenticated = true;
  //     //   return isAuthenticated;
  //     //   }
  //     return this.props.isAuthenticated
  //   });
  // };
componentDidMount() {
  this.props.isAuth();

}
  render() {

    return (
      <Switch>
        <ProtectedRoute
          isAuthenticated={this.props.isAuthenticated}
          exact
          path="/profile"
          component={Profile}
        />
        <ProtectedRoute
          isAuthenticated={this.props.isAuthenticated}
          exact
          path="/listpage"
          component={ListPage}
        />
        <ProtectedRoute
          isAuthenticated={this.props.isAuthenticated}
          exact
          path="/listpage/:listId"
          component={SingleList}
        />
        <ProtectedRouteIfAuth isAuthenticated={this.props.isAuthenticated} path="/" component={HomePage} />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  {isAuth}
)(AuthService);
