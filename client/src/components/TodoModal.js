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
  ListGroup
} from "reactstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addNewItem } from "../actions/listActions";

import {
  faTasks,
  faInfoCircle,
  faEdit
} from "@fortawesome/free-solid-svg-icons";

export class TodoModal extends Component {
  propTypes = {
    toggle: PropTypes.func.isRequired,
    modal: PropTypes.bool
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
    const currList = this.props.currList;
    const currTodo = this.props.currTodo;
    const {itemName} = this.state;
    this.props.addNewItem(currList._id, currTodo._id, itemName);
  };

  checklistRender = (todo) => {
    const checklist = todo.checklist;
    if (checklist.length > 0) {
      return checklist.map((item) => (
        <ListGroupItem
          className=" my-3 todoStyle d-flex flex-row align-items-center justify-content-between"
          key={item._id}
          onClick={""}
          action>
          <CardBody className="px-3">
            <span className=" font-weight-bold mb-0 d-inline float-left">
              {item.name}
            </span>
          </CardBody>
        </ListGroupItem>
      ));
    } else {
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <Input
            type="text"
            name="itemName"
            id="itemName"
            placeholder="Name"
            className="w-75 mx-auto mb-4"
            size="lg"
            onChange={this.onChange}
            autoComplete="off"
          />
          <Button className="w-75" size="lg" color="primary">
            <FontAwesomeIcon icon={faPlus} /> &nbsp; Add an Item
          </Button>
        </FormGroup>
      </Form>;
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
              <Button color="info" size="sm" onClick={""}>
                Edit
              </Button>
            </h4>

            <div className="my-3">
              {!todo.description ? (
                <p className="pl-4 text-left">
                  &nbsp; No Description. Click Edit to add a Description{" "}
                </p>
              ) : (
                <p className="text-left">todo.description</p>
              )}
              <br />
            </div>

            <h4 className="text-left font-weight-bold ">
              <FontAwesomeIcon icon={faTasks} /> Checklist &nbsp;
              <Button color="info" size="sm" onClick={""}>
                Edit
              </Button>
            </h4>

            <div className="my-3">
              <br />
            </div>

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

export default TodoModal;
