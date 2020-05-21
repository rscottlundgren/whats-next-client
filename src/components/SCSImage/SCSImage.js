import React, { Component } from 'react'

class SCSImage extends Component {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    return (
      <img style={{
        width: 'inherit',
        margin: '10px'
      }} src={this.props.image}/>
    )
  }
}

export default SCSImage
