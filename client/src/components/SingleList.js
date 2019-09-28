import React, { Component } from 'react'
import {
  Card,
  CardTitle,
  CardSubtitle,
  CardBody,
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup,
  Input,
  Button
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from 'react-moment';
import 'moment-timezone'
import { createNewTodo, deleteOneTodo } from "../actions/listActions";
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons'

export class SingleList extends Component {

  static propTypes = {
    currList: PropTypes.object.isRequired,
    createNewTodo: PropTypes.func.isRequired,
    deleteOneTodo: PropTypes.func.isRequired,
  };

  statusRender = (status) => {
    switch(status){
    case 'Done':
      return <span className="text-left badge badge-pill badge-success">{status}</span>
    case 'InProgress':
      return <span className="text-left badge badge-pill badge-warning">{status}</span>
    case 'NotStarted':
      return <span className="text-left badge badge-pill badge-danger">{status}</span>
    }
  }

  onDelete = ( listId, todoId, event ) => {
    event.stopPropagation();
    this.props.deleteOneTodo(listId, todoId);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    const currList = this.props.currList;
    e.preventDefault();
    const {listName} = this.state;

    this.props.createNewTodo(currList._id, listName);
  };

  render() {
    const currList = this.props.currList;
    return (
      <Card className=" w-75 listStyle">
        <CardBody >
        <CardTitle><h1>{this.props.currList.name}</h1></CardTitle>
        <CardSubtitle><h5>Select a todo or  create a new todo to get started </h5></CardSubtitle>
            <br/>
          <ListGroup>
          <br/>
            <br/>
            {
              currList.todos.map( (todo) =>
              <ListGroupItem  className="my-3 todoStyle" key={todo._id} action>
                <CardBody >
              <h3 className=" d-inline float-left">{todo.name}</h3>
              <Button className="float-right" color="danger" size="md" onClick={this.onDelete.bind(this, currList._id, todo._id)}> <FontAwesomeIcon icon={faTrashAlt} /></Button>
              <h4 className=" d-inline float-right">
                <Moment  date={todo.date} format="MMM DD YYYY"></Moment>
              </h4>

              <br/>
              <hr/>
              <br/>
              <p className ="text-left font-weight-bold">Description:</p>
              { !todo.description ? <p className="text-left">No Description Given.</p> : <p className="text-left">todo.description</p> }
              <br/>
              <p className ="text-left font-weight-bold">Status: &nbsp;
              {
                this.statusRender(todo.status)
              }
              </p>
              </CardBody>
              </ListGroupItem>

              )
            }
            <br/>
            <br/>
          </ListGroup>

          <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Input
                  type='text'
                  name='listName'
                  id='listNname'
                  placeholder='Name'
                  className='w-75 mx-auto mb-4'
                  size='lg'
                  onChange={this.onChange}
                />
      <Button className="w-75" size="lg" color="primary"> <FontAwesomeIcon icon={faPlus} /> &nbsp; Add a New ToDo </Button>
              </FormGroup>
            </Form>
        </CardBody>
      </Card>
    )
  }
}


const mapStateToProps = (state) => ({ //Maps state to redux store as props
  currList: state.list.currList
});

export default connect(mapStateToProps, { createNewTodo, deleteOneTodo })(SingleList);