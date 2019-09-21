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
import { getList, getSingleList } from "../actions/listActions";
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

  selectList = (id) => {
    this.props.getSingleList(id)
  }
  displayLists = () => {
    const items = this.props.items;
    const listItems = items.map((item) =>
      <ListGroupItem tag="button" key={item._id} action onClick={this.selectList.bind(this, item._id)}>
      <h3 className=" d-inline float-left">{item.name}</h3>
      { <h4 className=" d-inline float-right"> <Moment  date={item.date} format="MMM DD YYYY"></Moment></h4>}
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
export default connect(mapStateToProps,{ getList, getSingleList })(ListPage);
