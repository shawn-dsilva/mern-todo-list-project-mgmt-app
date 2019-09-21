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
import 'bootstrap/dist/css/bootstrap.min.css';

export class SingleList extends Component {

  static propTypes = {
    currList: PropTypes.object.isRequired
  };

  render() {
    return (
      <Card>
        <CardBody>
        <CardTitle><h1>{this.props.currList.name}</h1></CardTitle>

          <ListGroup>
            {
              this.props.currList.todos.map( (todo) =>
              <Card>
              <ListGroupItem tag="button" key={todo._id} action>
              <h3 className=" d-inline float-left">{todo.name}</h3>
              <h4 className=" d-inline float-right">
                <Moment  date={todo.date} format="MMM DD YYYY"></Moment>
              </h4>
              </ListGroupItem>
              </Card>

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