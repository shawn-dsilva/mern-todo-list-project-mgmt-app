import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  ListGroupItem,
  ListGroup,
  Input,
  CardBody,
  Label
} from "reactstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addNewItem, markDone } from "../actions/listActions";
import { connect } from "react-redux";


import {
  faTasks,
  faInfoCircle,
  faEdit,
  faPlus
} from "@fortawesome/free-solid-svg-icons";

export class TodoModal extends Component {
  static propTypes = {
    toggle: PropTypes.func.isRequired,
    modal: PropTypes.bool,
    addNewItem: PropTypes.func.isRequired,
    addMarkDone: PropTypes.func.isRequired,

  };

  statusRender = (status) => {
    switch (status) {
      case "Done":
        status = "Done";
        return (
          <h5 className="mb-0 d-inline">
            <span className="text-left badge badge-pill badge-success">
              {status}
            </span>
          </h5>
        );
      case "InProgress":
        status = "In Progress";
        return (
          <h5 className="mb-0 d-inline">
            <span className="text-left badge badge-pill badge-warning">
              {status}
            </span>
          </h5>
        );
      case "NotStarted":
        status = "Not Started";
        return (
          <h5 className="mb-0 d-inline">
            <span className="text-left badge badge-pill badge-danger">
              {status}
            </span>
          </h5>
        );
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const currList = this.props.list;
    const currTodo = this.props.todo;
    const {itemName} = this.state;
    this.props.addNewItem(currList._id, currTodo._id, itemName);
  };

  handleCheck = (checklistId, e) => {
    e.preventDefault();
    const currList = this.props.list;
    const currTodo = this.props.todo;
    this.props.markDone(currList._id, currTodo._id, checklistId);
  };

  ChecklistRender = (todo) => {

   if ( todo.checklist.length > 0 ) {
     return (
      todo.checklist.map((item) => {
      if(!item.isDone) {
        return (
      <ListGroupItem className=" shadow-sm my-3 ml-4 w-50 d-flex flex-row align-items-center justify-content-between" key={item._id} action>
         <span className=" mb-0 d-inline float-left">
           <FormGroup check>
             <Label check>
               <Input type="checkbox" onChange={this.handleCheck.bind(this, item._id)}/>
                   {item.name}
               </Label>
           </FormGroup>
          </span>
        </ListGroupItem>)}
      else {
        return (
        <ListGroupItem color="secondary" className=" shadow-sm my-3 ml-4 w-50 d-flex flex-row align-items-center justify-content-between" key={item._id} action>
         <span className=" mb-0 d-inline float-left">
           <FormGroup check>
             <Label check>
               <Input type="checkbox" onChange={this.handleCheck.bind(this, item._id)}/>
               <s>{item.name}</s>
               </Label>
           </FormGroup>
          </span>
      </ListGroupItem>)
      }}))
      } else {
      return (
      <div>
        <p className="ml-4 mt-3">No items in this checklist, Add an item below.</p>
      </div> )
    }
  };

  render() {
    const todo = this.props.todo;

    return (
      <div>
        <Modal
          centered
          size="lg"
          isOpen={this.props.modal}
          toggle={this.props.toggle}>
          <ModalHeader toggle={this.props.toggle}>
            <h2 className=" m-3 font-weight-bold">{this.props.todo.name}</h2>
          </ModalHeader>

          <ModalBody className=" m-3">
            <h4 className="text-left font-weight-bold ">
              <FontAwesomeIcon icon={faEdit} /> Description &nbsp;
              <Button color="info" size="sm" >
                Edit
              </Button>
            </h4>

            <div className="my-3">
              {!todo.description ? (
                <p className="pl-4 text-left">
                  No Description. Click Edit to add a Description{" "}
                </p>
              ) : (
                <p className="text-left">todo.description</p>
              )}
              <br />
            </div>

            <h4 className="text-left font-weight-bold ">
              <FontAwesomeIcon icon={faTasks} /> Checklist &nbsp;
            </h4>

            {this.ChecklistRender(todo)}
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
               <Input
                 type="text"
                 name="itemName"
                 id="itemName"
                 placeholder="checklist name"
                 className="w-50 ml-4 my-4"
                 onChange={this.onChange}
                 autoComplete="off"
                 />
               <Button className="w-50 ml-4" color="primary">
             <FontAwesomeIcon icon={faPlus} /> &nbsp; Add Checklist Item </Button>
             </FormGroup>
           </Form>

            <p className="text-left font-weight-bold">
              Status: &nbsp;
              {this.statusRender(todo.status)}
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.props.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default connect(null,{addNewItem, markDone})(TodoModal);
