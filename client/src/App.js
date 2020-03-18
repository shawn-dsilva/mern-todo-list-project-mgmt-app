import React, { Component } from "react";


import MainNavbar from "./components/MainNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Provider } from "react-redux";
import { isAuth } from "./actions/authActions";
import MainRouter from "./components/Routing/MainRouter";
import store from "./store";
import { Helmet } from "react-helmet";
import Footer from "./components/Footer";

class App extends Component {
  componentDidMount() {
    store.dispatch(isAuth());
  }
  render() {
    return (
      <Provider store={store}>
        <Helmet titleTemplate="ListWala | %s " defaultTitle="ListWala">
          <meta
            name="description"
            content="A ToDo List and Project Management App"
          />
        </Helmet>
        <MainNavbar />
        <MainRouter />
        <Footer />
      </Provider>
    );
  }
}

export default App;
