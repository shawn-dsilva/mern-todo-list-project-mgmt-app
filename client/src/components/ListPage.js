import React, { Component } from 'react'
import {
  Button,
  Card,
  CardTitle,
  CardSubtitle,
  CardBody,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import { connect } from "react-redux";
import { getList } from "../actions/listActions";
import PropTypes from "prop-types";
import Moment from 'react-moment';
import 'moment-timezone'
import 'bootstrap/dist/css/bootstrap.min.css';


export class ListPage extends Component {
  static propTypes = {
    getList: PropTypes.func.isRequired,
    getSingleList: PropTypes.func.isRequired,
    items: PropTypes.object.isRequired
  };

  componentDidMount()  {
    this.props.getList();
  }

  selectList = () => {
    this.props.getSingleList()
  }
  displayLists = () => {
    const items = this.props.items;
    const listItems = items.map((item) =>
      <ListGroupItem key={item._id}>
      {item.name}
      { <Moment className="text-right" date={item.date} format="MMM DD YYYY"></Moment>}
      </ListGroupItem>
    );
    return (
      <ListGroup>{listItems}</ListGroup>
    );
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
        {this.displayLists()}
        <br/>
      <Button size="lg" onClick={this.onLogout} color="primary">Logout</Button>
          </CardBody>
        </Card>
      </div>
  </div>
    )
  }
}

const mapStateToProps = (state) => ({ //Maps state to redux store as props
  items: state.list.items
});
export default connect(mapStateToProps,{ getList })(ListPage);
