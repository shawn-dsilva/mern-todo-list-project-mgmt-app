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
import MainRouter from './components/Routing/MainRouter';
import store from './store';


class App extends Component {

  componentDidMount(){
    store.dispatch(isAuth());
  }
  render () {

    return (
      <Provider store={store}>
            <MainNavbar/>
            <MainRouter/>
      </Provider>
    );
}
}

export default App;
