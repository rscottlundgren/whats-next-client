import React, { Component, Fragment } from 'react'

class SCSImage extends Component {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    return (
      <Fragment>
        {this.props.keywords}
      </Fragment>
    )
  }
}

export default SCSImage
