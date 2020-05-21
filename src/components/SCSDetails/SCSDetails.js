import React, { Component } from 'react'
import ScsDetailsColumn from '../Styles/ScsDetailsColumn'

class SCSDetails extends Component {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    return (
      <ScsDetailsColumn>
        <p>Theme: {this.props.details.theme}</p>
        <p>Astrology/Element: {this.props.details.astrology_element}</p>
        <p>Keys [Element] (If Applicable): {this.props.details.elementKeys}</p>
        <p>Keys [Number/Court]: {this.props.details.numberCourtKeys}</p>
        <p>Keys [Suit]: {this.props.details.suitKeys}</p>
        <p>Card Meaning [Deck Specific]: {this.props.details.meaningVertigo}</p>
        <p>Card Meaning [General Keywords]: {this.props.details.keywords}</p>
      </ScsDetailsColumn>
    )
  }
}

export default SCSDetails
