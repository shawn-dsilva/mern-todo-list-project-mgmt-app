import React , { Component } from 'react';
import HomePage from './components/HomePage';
import Profile from './components/Profile';
import ListPage from './components/ListPage';
import SingleList from './components/SingleList';

import MainNavbar from './components/MainNavbar';
import { Route, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from 'react-redux';
import { isAuth } from './actions/authActions'
import AuthService from './services/AuthService';
import store from './store';


class App extends Component {

  render () {
    return (
      <Provider store={store}>
            <MainNavbar/>
            <AuthService/>
      </Provider>
    );
}
}

export default App;
