import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import SingleList from './SingleList';
import { connect } from "react-redux";
import { Route, Switch, Link } from 'react-router-dom'
import {
  Button,
} from "reactstrap";
import PropTypes from "prop-types";
import { buttonClicked } from "../actions/uiActions";
import './style.css';
import store from '../store';
import { isAuth } from '../actions/authActions'
import {Redirect} from 'react-router-dom'
import { ListPage } from './ListPage';




export class HomePage extends Component {

  // componentDidMount() {
  //   // Check if session cookie is present
  //   store.dispatch(isAuth());
  // }

  static propTypes = {
    button: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
  };

  render() {

    // if(this.props.isAuthenticated) {
    //   return <Redirect to="/listpage" />
    // }

    return (
       <div className="container">
        <div className="main">
          <h1> <strong className="text-primary" >List</strong><span>Wala</span></h1>
          <br/>
            <h5>A ToDo List and Project Management App
              <br></br>Built with React + Redux, NodeJS, Express, MongoDB and Bootstrap. <br></br>Hosted using Nginx & Docker on AWS</h5>
          <br/>
          <div>

            <Switch>
              <Route exact path ="/login" component={Login}/>
              <Route exact path ="/register" component={Register}/>
            </Switch>

             { this.props.button && <Link className='divStyle' to="/login">
               <Button size="lg"  color="primary">Sign In</Button>
               </Link>}

             {this.props.button && <Link className='divStyle' to="/register">
               <Button  size="lg"  color="primary">Register</Button>
             </Link>}

          </div>
        </div>
    </div>
    )
  }
}
const mapStateToProps = (state) => ({ //Maps state to redux store as props
  button: state.ui.button,
  isAuthenticated: state.auth.isAuthenticated

});

export default connect(mapStateToProps)(HomePage);
