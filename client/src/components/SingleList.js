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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import TodoModal from './TodoModal';

export class SingleList extends Component {

  state = { isOpen: false };

  static propTypes = {
    currList: PropTypes.object.isRequired,
    createNewTodo: PropTypes.func.isRequired,
    deleteOneTodo: PropTypes.func.isRequired,
  };

  statusRender = (status) => {
    switch(status){
    case 'Done':
      status = 'Done';
      return <h5 className="mb-0 d-inline"><span className="text-left badge badge-pill badge-success">{status}</span></h5>
    case 'InProgress':
        status = 'In Progress';
      return <h5 className="mb-0 d-inline"><span className="text-left badge badge-pill badge-warning">{status}</span></h5>
    case 'NotStarted':
        status = 'Not Started';
      return <h5 className="mb-0 d-inline"><span className="text-left badge badge-pill badge-danger">{status}</span></h5>
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

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const currList = this.props.currList;
    return (
      <Card className=" w-75 listStyle">
        <CardBody >
        <CardTitle><h1>{this.props.currList.name}</h1></CardTitle>
        <CardSubtitle><h5 className="text-muted">Select a todo or  create a new todo to get started </h5></CardSubtitle>
            <br/>
          <ListGroup>
          <br/>
            <br/>
            {
              currList.todos.map( (todo) =>
              <ListGroupItem  className=" todoStyle d-flex flex-row align-items-center justify-content-between" key={todo._id} onClick={this.toggle} action>
              <CardBody className="px-3" >
              <h2 className=" font-weight-bold mb-0 d-inline float-left">{todo.name}</h2>
              <span className="text-muted float-right d-flex flex-row  align-items-center justify-content-between">
                <Moment  className="pr-3" date={todo.date} format="MMM DD YYYY"></Moment>
              <Button className="float-right" color="danger" size="md" onClick={this.onDelete.bind(this, currList._id, todo._id)}> <FontAwesomeIcon icon={faTrashAlt} /></Button>
              </span>
              <br/>
              <br/>
              <hr></hr>

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

          <TodoModal modal={this.state.isOpen} toggle={this.toggle} todo={this.props.currList.todos[0]}></TodoModal>

          <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Input
                  type='text'
                  name='listName'
                  id='listName'
                  placeholder='Name'
                  className='w-75 mx-auto mb-4'
                  size='lg'
                  onChange={this.onChange}
                  autoComplete="off"
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