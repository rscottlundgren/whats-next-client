import React, { Fragment, Component } from 'react'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import SCSImage from '../SCSImage/SCSImage'

class SingleCardSpread extends Component {
  constructor () {
    super()
    this.state = {
      tarotCard: null,
      tarotIMG: null
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
        let tarotIMG
        if (res.data.singleCardSpread.firstCardObject.majorArcana.cardName !== '') {
          if (res.data.singleCardSpread.firstCardState === 'analog') {
            tarotCard = res.data.singleCardSpread.firstCardObject.majorArcana.analog
            tarotIMG = res.data.singleCardSpread.analogFaceIMG
          } else {
            tarotCard = res.data.singleCardSpread.firstCardObject.majorArcana.echo
            tarotIMG = res.data.singleCardSpread.echoFaceIMG
          }
        } else {
          if (res.data.singleCardSpread.firstCardObject.firstCardState === 'analog') {
            tarotCard = res.data.singleCardSpread.firstCardObject.minorArcana.analog
            tarotIMG = res.data.singleCardSpread.analogFaceIMG
          } else {
            tarotCard = res.data.singleCardSpread.firstCardObject.minorArcana.echo
            tarotIMG = res.data.singleCardSpread.echoFaceIMG
          }
        }
        this.setState({ tarotCard })
        this.setState({ tarotIMG })
      })
      .catch(console.error)
  }

  render () {
    const { tarotCard } = this.state
    const { tarotIMG } = this.state

    if (!tarotCard) {
      return 'Loading...'
    }

    return (
      <Fragment>
        <SCSImage image={'https://i.imgur.com/BX9gNt9.jpg'}/>
      </Fragment>
    )
  }
}

export default SingleCardSpread
