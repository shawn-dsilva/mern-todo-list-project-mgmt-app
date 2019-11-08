import React, { Component } from 'react';
import Helmet from 'react-helmet';

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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Route, Switch, Link } from 'react-router-dom'


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


  selectList = (id, event) => {
    event.stopPropagation();
    this.props.getSingleList(id)
  }

  onDelete = ( id, event ) => {
    event.stopPropagation();
    this.props.deleteOneList(id);
  }

  displayLists = () => {
    const items = this.props.items;
    const listItems = items.map((item) =>
        <ListGroupItem className="d-flex ListItem" key={item._id} action >
        <Link className="w-100  d-flex ListLink text-dark text-decoration-none" to={`/listpage/${item._id}`}>
        <h3 className=" font-weight-bold mb-0 d-inline float-left">{item.name}</h3>
         <span>
          <Moment  date={item.date} format="MMM DD YYYY"></Moment>
        </span>
        </Link>
        <Button className="DeleteButton" color="danger" size="md" onClick={this.onDelete.bind(this, item._id)}> <FontAwesomeIcon icon={faTrashAlt} />  DELETE</Button>
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

    // if(!this.props.authState.isAuthenticated) {
    //   return <Redirect to="/" />
    // }

    return (
      <div className="container">
        <Helmet>
          <title>List Home</title>
        </Helmet>
      <div className="w-100">
        { Object.keys(this.props.currList).length === 0 ? (
        <Card className="listHomeStyle">
          <CardBody>
        <CardTitle><h1 className="font-weight-bold">List Home</h1></CardTitle>
        <br/>
         <CardSubtitle><h5 className="text-muted">Select a list or  create a new list to get started </h5></CardSubtitle>
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
                  size='lg'
                  onChange={this.onChange}
                  autoComplete="off"

                />
      <Button size="lg" color="primary"> <FontAwesomeIcon icon={faPlus} /> &nbsp; Create A New List</Button>
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
