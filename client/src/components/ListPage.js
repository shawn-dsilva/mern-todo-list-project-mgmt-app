import React, { Component } from 'react'
import {
  Button,
  Card,
  CardTitle,
  CardSubtitle,
  CardBody
} from "reactstrap";
import { connect } from "react-redux";
import { getList } from "../actions/listActions";
import PropTypes from "prop-types";

export class ListPage extends Component {
  static propTypes = {
    getList: PropTypes.func.isRequired,
  };

  componentDidMount()  {
    this.props.getList();
  }

  render() {
    return (
      <div className="container">
      <div className="main">
        <Card>
          <CardBody>
        <CardTitle><h1>You are on the List Page now</h1></CardTitle>
        <br/>
         <CardSubtitle><h5>Select a list or  create a new list to get started </h5></CardSubtitle>
        <br/>
      <Button size="lg" onClick={this.onLogout} color="primary">Logout</Button>
          </CardBody>
        </Card>
      </div>
  </div>
    )
  }
}

export default ListPage
