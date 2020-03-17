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
       <div className="HomeContainer">
        <div className="main">
          <br></br>
          <h1> <strong className="text-primary" >List</strong><span>Wala</span></h1>
          <br/>
            <h5>A ToDo List and Project Management Web App, supporting user authentication,
            <br></br>sessions, protected routes, CRUD functions on descriptions, <br></br>checklists and status changes and more</h5>
            <h5>Source Code on and full feature list <i class="devicon-github-plain colored"></i>
 <a href="github.com/shawn-dsilva/list-wala" > Github</a></h5>
 <br></br>

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
          <br></br>
          <br></br>
              <div class="builtwith">
              <i class="size devicon-react-original-wordmark colored"></i>
              <i class="size devicon-bootstrap-plain-wordmark colored"></i>
              <i class="size devicon-nodejs-plain colored"></i>
              <i class="size devicon-mongodb-plain-wordmark colored"></i>
              <i class="size devicon-docker-plain-wordmark colored"></i>
              <i class="size devicon-nginx-plain-wordmark colored"></i>
              <i class="size devicon-ubuntu-plain-wordmark colored"></i>
              </div>
              <p>Built with React + Redux, Bootstrap, NodeJS + Express and MongoDB
              <br></br>Hosted in Docker containers running Nginx, on an Ubuntu VM</p>

          <br/>
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
