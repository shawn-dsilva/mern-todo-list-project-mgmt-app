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

import store from './store';


class App extends Component {

  componentDidMount() {
    // Check if session cookie is present
    store.dispatch(isAuth());
  }

  render () {
    return (
      <Provider store={store}>
            <MainNavbar/>
            <Switch>
              <Route exact path ="/" component={HomePage}/>
              <Route exact path ="/profile" component={Profile}/>
              <Route exact path ="/listpage" component={ListPage}/>
              <Route exact path="/listpage/:listId" component={SingleList}/>

            </Switch>
      </Provider>
    );
}
}

export default App;
