import React, { Component } from "react";
import { connect } from "react-redux";
import { isAuth } from "../../actions/authActions";
import HomePage from '../HomePage';
import Profile from '../Profile';
import ListPage from '../ListPage';
import SingleList from '../SingleList';
import { Route, Switch} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute';
import ProtectedRouteIfAuth from './ProtectedRouteIfAuth';
import LoadingSpinner from '../LoadingSpinner';
import Error404 from '../Error404';


export class MainRouter extends Component {
  // authChecker = () => {
  //   isAuth().then(() => {
  //     // if(this.props.isAuthenticated === true ) {
  //     //   const isAuthenticated = true;
  //     //   return isAuthenticated;
  //     //   }
  //     return this.props.isAuthenticated
  //   });
  // };
  render() {
    if(this.props.isAuthenticated === true || this.props.isAuthenticated === false) {
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
        <ProtectedRouteIfAuth isAuthenticated={this.props.isAuthenticated} exact path="/(|login|register)/" component={HomePage} />
        <Route component={Error404}/>
      </Switch>
    );
    } else {
      return <LoadingSpinner/>
    }
  }
}

const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  {isAuth}
)(MainRouter);
