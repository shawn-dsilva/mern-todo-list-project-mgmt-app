import React, { Component } from 'react'
import {
  Button,
  Card,
  CardTitle,
  CardSubtitle,
  CardBody,
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { getList, getSingleList, createNewList, deleteOneList } from "../actions/listActions";
import PropTypes from "prop-types";
import Moment from 'react-moment';
import 'moment-timezone'
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleList from "./SingleList";
import { Redirect } from 'react-router-dom'
import { stat } from 'fs';


export class ListPage extends Component {

  state = {
    listName: '',
  }

  static propTypes = {
    getList: PropTypes.func.isRequired,
    getSingleList: PropTypes.func.isRequired,
    deleteOneList: PropTypes.func.isRequired,
    authState: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    currList: PropTypes.object.isRequired,
    createNewList: PropTypes.func.isRequired,
  };

  componentDidMount()  {
    this.props.getList();
  }


  selectList = (id) => {
    this.props.getSingleList(id)
  }

  onDelete = ( id ) => {
    this.props.deleteOneList(id);
  }

  displayLists = () => {
    const items = this.props.items;
    const listItems = items.map((item) =>
      <ListGroupItem tag="button" key={item._id} action onClick={this.selectList.bind(this, item._id)}>
      <h3 className=" d-inline float-left">{item.name}</h3>
      { <h4 className=" d-inline"> <Moment  date={item.date} format="MMM DD YYYY"></Moment></h4>}
      <Button className="remove-btn float-right" color="danger" size="sm" onClick={this.onDelete.bind(this, item._id)}> &times; </Button>
      </ListGroupItem>
    );
    return (
      <ListGroup>{listItems}</ListGroup>
    );
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const {listName} = this.state;

    this.props.createNewList(listName);
  };

  render() {

    if(!this.props.authState.isAuthenticated) {
      return <Redirect to="/" />
    }

    return (
      <div className="container">
      <div className="main">
        { Object.keys(this.props.currList).length === 0 ? (
        <Card>
          <CardBody>
        <CardTitle><h1>You are on the List Page now</h1></CardTitle>
        <br/>
         <CardSubtitle><h5>Select a list or  create a new list to get started </h5></CardSubtitle>
        <br/>
        {this.displayLists()}
        <br/>
        <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Input
                  type='text'
                  name='listName'
                  id='listNname'
                  placeholder='Name'
                  className='mb-3'
                  onChange={this.onChange}
                />
      <Button size="lg" color="primary"> + Create A New List</Button>
              </FormGroup>
            </Form>
          </CardBody>
        </Card> ) :
        (
        // <Card>
        //   <CardBody>
        // <CardTitle><h1>{this.props.currList.name}</h1></CardTitle>
        // <br/>
        // <br/>
        //   </CardBody>
        // </Card>
        <SingleList/>
        )
        }
      </div>
  </div>
    )
  }
}

const mapStateToProps = (state) => ({ //Maps state to redux store as props
  items: state.list.items,
  currList: state.list.currList,
  authState: state.auth

});
export default connect(mapStateToProps,{ getList, getSingleList, createNewList, deleteOneList })(ListPage);
