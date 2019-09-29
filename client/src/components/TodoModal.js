import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';


export class TodoModal extends Component {
  
  
  propTypes = {
    toggle: PropTypes.func.isRequired,
    modal: PropTypes.bool,
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} >
          <ModalHeader toggle={this.props.toggle}>{this.props.todo.name}</ModalHeader>
          <ModalBody>
          {this.props.todo.description}
          {this.props.todo.status}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default TodoModal
