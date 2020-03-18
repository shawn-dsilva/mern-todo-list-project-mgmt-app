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
  Input,
  Label
} from "reactstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addNewItem, markDone, changeStatus, addDesc } from "../actions/listActions";
import { connect } from "react-redux";


import {
  faTasks,
  faEdit,
  faPlus
} from "@fortawesome/free-solid-svg-icons";

export class TodoModal extends Component {
  static propTypes = {
    toggle: PropTypes.func.isRequired,
    modal: PropTypes.bool,
    addNewItem: PropTypes.func.isRequired,
    addMarkDone: PropTypes.func.isRequired,
    changeStatus: PropTypes.func.isRequired,
    addDesc: PropTypes.func.isRequired,
  };

  state = {
    isOpenStatusMenu : false,
    isOpenDescInput: false,
  }

  statusRender = (status) => {
    switch (status) {
      case "Done":
        status = "Done";
        return (
            <span className=" text-left badge badge-success">
              {status}
            </span>
        );
      case "InProgress":
        status = "In Progress";
        return (
            <span className=" text-left badge badge-warning">
              {status}
            </span>
        );
      case "NotStarted":
        status = "Not Started";
        return (
            <span className=" text-left badge badge-danger">
              {status}
            </span>
        );
      default:
        return;
    }
  };


  toggleStatusMenu = () => {
    this.setState({isOpenStatusMenu: !this.state.isOpenStatusMenu});
  };

  StatusMenu = () => {
    const statusCodes = [
    { name:'Done', color: 'border-success bg-success'},
    {name:'In Progress', color: 'border-warning bg-warning'},
    {name:'Not Started', color: 'border-danger bg-danger'}];
    const className = "text-left  mb-0 mx-1 d-inline "
    return (
      statusCodes.map((status) =>
        <Button key={status.name} className={className + status.color} onClick={(e) => {this.handleStatusChange(status.name, e)}}>
          {status.name}
        </Button>))
  }

  handleStatusChange = (status, e) => {
    e.preventDefault();
    const currList = this.props.list;
    const currTodo = this.props.todo;
    status = status.split(" ").join('');
    console.log(status);
    this.props.changeStatus(currList._id, currTodo._id, status );
    this.toggleStatusMenu();
  }

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

  handleCheck = (itemId, isDone, e) => {
    e.preventDefault();
    e.stopPropagation();
    const currList = this.props.list;
    const currTodo = this.props.todo;
    this.props.markDone(currList._id, currTodo._id, itemId, isDone);
  };

  ChecklistRender = (todo) => {

   if ( todo.checklist.length > 0 ) {
     return (
      todo.checklist.map((item) => {
      if(!item.isDone) {
        return (
      <ListGroupItem className=" shadow-sm  d-flex ChecklistStyle" key={item._id} >
         <span className=" mb-0 d-inline float-left">
           <FormGroup check>
             <Label check>
               <Input type="checkbox" checked={item.isDone} onChange={(e) => this.handleCheck( item._id, item.isDone, e )}/>
                   {item.name}
               </Label>
           </FormGroup>
          </span>
        </ListGroupItem>)}
      else {
        return (
        <ListGroupItem color="secondary" className="shadow-sm  d-flex ChecklistStyle" key={item._id} action>
         <span className=" mb-0 d-inline float-left">
           <FormGroup check>
             <Label check>
               <Input type="checkbox" checked={item.isDone} onChange={(e) => this.handleCheck( item._id, item.isDone, e )}/>
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

  toggleEditBox = () => {
    this.setState({isOpenDescInput: !this.state.isOpenDescInput});
  }

  descOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  descSubmit = e => {
    e.preventDefault();
    const currList = this.props.list;
    const currTodo = this.props.todo;
    const {desc} = this.state;
    this.props.addDesc(currList._id, currTodo._id, desc);
    this.toggleEditBox();
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
              <Button color="info" size="sm" onClick={this.toggleEditBox} >
                Edit
              </Button>
            </h4>

            <div className="DescText">
              {!this.state.isOpenDescInput ? (
                   <p className="text-left text-muted">{todo.desc}</p>
              ) : (
                <Form onSubmit={this.descSubmit}>
                <FormGroup>
                   <Input
                     type="textarea"
                     name="desc"
                     id="desc"
                     placeholder="Add a description here"
                     rows="4"
                     className="w-100 MarginLeftToggle my-4"
                     onChange={this.descOnChange}
                     autoComplete="off"
                     />
                  <div className="d-flex flex-row w-50">
                  <Button className=" w-100 MarginLeftToggle" color="success"> Save </Button>
                 <Button onClick={this.toggleEditBox} className=" w-100 MarginLeftToggle" color="light"> Cancel </Button>
                 </div>
                 </FormGroup>
               </Form>
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
                 className="AddTodo my-4"
                 onChange={this.onChange}
                 autoComplete="off"
                 />
               <Button className="AddTodo" color="primary">
             <FontAwesomeIcon icon={faPlus} /> &nbsp; Add Checklist Item </Button>
             </FormGroup>
           </Form>

            { !this.state.isOpenStatusMenu ? <h4 className="mt-5 text-left font-weight-bold">
              Status: &nbsp;
              {this.statusRender(todo.status)}
              <Button className="ChangeStatus bg-light border-secondary text-dark "  onClick={this.toggleStatusMenu}>Change Status</Button>
            </h4>: <div> <h4 className="mt-5 font-weight-bold">Change Status</h4>  {this.StatusMenu()} </div>
          }

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

export default connect(null,{addNewItem, markDone, changeStatus, addDesc})(TodoModal);
