import React, { Fragment, Component } from 'react'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import SCSImage from '../SCSImage/SCSImage'

class SingleCardSpread extends Component {
  constructor () {
    super()
    this.state = {
      tarotCard: null
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/singleCardSpreads/${this.props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then((res) => {
        let tarotCard
        if (res.data.singleCardSpread.firstCardObject.majorArcana.cardName !== '') {
          if (res.data.singleCardSpread.firstCardState === 'analog') {
            tarotCard = res.data.singleCardSpread.firstCardObject.majorArcana.analog
          } else {
            tarotCard = res.data.singleCardSpread.firstCardObject.majorArcana.echo
          }
        } else {
          if (res.data.singleCardSpread.firstCardObject.firstCardState === 'analog') {
            tarotCard = res.data.singleCardSpread.firstCardObject.minorArcana.analog
          } else {
            tarotCard = res.data.singleCardSpread.firstCardObject.minorArcana.echo
          }
        }
        this.setState({ tarotCard })
      })
      .catch(console.error)
  }

  render () {
    const { tarotCard } = this.state

    if (!tarotCard) {
      return 'Loading...'
    }

    return (
      <Fragment>
        <SCSImage keywords={tarotCard.keywords}/>
      </Fragment>
    )
  }
}

export default SingleCardSpread
