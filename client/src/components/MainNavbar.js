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
        <NavLink className="text-white font-weight-bold" onClick={this.onLogout} href="#">
          Logout
        </NavLink>
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
        <NavLink className="divStyle text-white font-weight-bold"><Link className="text-white font-weight-bold active" to="/login">Sign In</Link></NavLink>
        </NavItem>
        <NavItem>
        <NavLink className="divStyle text-white font-weight-bold" ><Link className="text-white font-weight-bold active" to="/register">Register</Link></NavLink>
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color="dark" dark expand="sm" >
          <Container>
            <NavbarBrand href="/"><h3 className="mb-0"> <strong className="text-primary" >List</strong><span>Wala</span></h3></NavbarBrand>

            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>


            { isAuthenticated ? <Nav className="mr-auto text-white" navbar>
           <NavItem>
              <NavLink className="text-white font-weight-bold active" > <Link className="text-white font-weight-bold active" to="/listpage">Back to List Home </Link></NavLink>
            </NavItem>
            </Nav> : null}

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
