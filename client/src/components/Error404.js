import React, { Component } from 'react'

export class Error404 extends Component {
  render() {
    return (
 <div className="container">
        <div className="mt-auto mb-auto ml-auto mr-auto">
          <h1 className="d-block"> ERROR <span className="font-weight-bold text-danger " >404</span> </h1>
          <h3 className="d-block"> The Requested Resource could not be found </h3>
        </div>
      </div>
    )
  }
}

export default Error404
