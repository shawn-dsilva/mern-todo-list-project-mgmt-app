import React, { Component, Fragment } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Login from "./Login";
import Register from "./Register";
import { logout } from '../actions/authActions';
import { buttonReset} from '../actions/uiActions';

export class MainNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    buttonReset: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  onLogout = (e) => {
    e.preventDefault();
    this.props.buttonReset();
    this.props.logout();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;


    const authLinks = (
      <Fragment>
          <NavItem>
              <span className="navbar-text mr-3">
                  <strong>{ user ? `Welcome,  ${user.sessUser.name}` : '' }</strong>
              </span>
          </NavItem>
        <NavItem>
        <NavLink onClick={this.onLogout} href="#">
          Logout
        </NavLink>
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
        <NavLink className='divStyle' href="/login">Sign In</NavLink>
        </NavItem>
        <NavItem>
        <NavLink className='divStyle' href="/register"> Register </NavLink>
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">List Wala</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar >
              { isAuthenticated ? authLinks : guestLinks }
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  button: state.ui.button,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout, buttonReset }
)(MainNavbar);
