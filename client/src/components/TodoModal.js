import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faInfoCircle , faEdit} from '@fortawesome/free-solid-svg-icons';

export class TodoModal extends Component {


  propTypes = {
    toggle: PropTypes.func.isRequired,
    modal: PropTypes.bool,
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

  render() {

    const todo = this.props.todo;

    return (
      <div>
        <Modal  centered size="lg" isOpen={this.props.modal} toggle={this.props.toggle} >
          <ModalHeader toggle={this.props.toggle}>
            <h2 className=" m-3 font-weight-bold">{this.props.todo.name}</h2>
          </ModalHeader>

          <ModalBody className=" m-3">
          <h4 className ="text-left font-weight-bold ">
            <FontAwesomeIcon icon={faEdit} /> Description &nbsp;
          <Button  color="info" size="sm" onClick={''}>Edit</Button></h4>

            <div className="my-3">
              { !todo.description ? <p className="pl-4 text-left">&nbsp; No Description. Click Edit to add a Description </p> : <p className="text-left">todo.description</p> }
              <br/>
            </div>

            <h4 className ="text-left font-weight-bold ">
            <FontAwesomeIcon icon={faTasks} /> Checklist &nbsp;
            <Button  color="info" size="sm" onClick={''}>Edit</Button></h4>

            <div className="my-3">
              { !todo.description ? <p className="pl-4 text-left">&nbsp; No Description. Click Edit to add a Description </p> : <p className="text-left">todo.description</p> }
              <br/>
            </div>

              <p className ="text-left font-weight-bold">Status: &nbsp;
              {
                this.statusRender(todo.status)
              }
              </p>

          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.props.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default TodoModal
