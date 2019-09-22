import React, { Component } from 'react'
import {
  Card,
  CardTitle,
  CardSubtitle,
  CardBody,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from 'react-moment';
import 'moment-timezone'
import './style.css';

export class SingleList extends Component {

  static propTypes = {
    currList: PropTypes.object.isRequired
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


  render() {
    const currList = this.props.currList;
    return (
      <Card>
        <CardBody>
        <CardTitle><h1>{this.props.currList.name}</h1></CardTitle>

          <ListGroup>
            {
              currList.todos.map( (todo) =>
              <ListGroupItem  key={todo._id}  tag="button">
                <CardBody className="todoStyle">
              <h3 className=" d-inline float-left">{todo.name}</h3>
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
          </ListGroup>
        </CardBody>
      </Card>
    )
  }
}


const mapStateToProps = (state) => ({ //Maps state to redux store as props
  currList: state.list.currList
});
export default connect(mapStateToProps)(SingleList);