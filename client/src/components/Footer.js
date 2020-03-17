import React, { Component } from 'react'

export class Footer extends Component {
  render() {
    return (
      <div className="d-flex pt-4 bg-dark">
      <div className="mt-auto ml-auto mr-auto pb-3 text-white">
        <h5 className="d-block"> Made by <a style={{color: "white", textDecoration: "underline", textDecorationStyle:"dotted"}} href="https://www.shawndsilva.com"> Shawn D'silva  </a></h5>
      </div>
    </div>
    )
  }
}

export default Footer
