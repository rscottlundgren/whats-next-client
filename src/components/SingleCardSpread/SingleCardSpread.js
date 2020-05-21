import React, { Component } from 'react'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import SCSImage from '../SCSImage/SCSImage'
import ScsContainer from '../Styles/ScsContainer'
import SCSDetails from '../SCSDetails/SCSDetails'
import SCSUpdateForm from '../SCSUpdateForm/SCSUpdateForm'
import { Col, Row } from 'react-bootstrap'
import messages from '../AutoDismissAlert/messages'

class SingleCardSpread extends Component {
  constructor () {
    super()
    this.state = {
      tarotCard: null,
      tarotImage: null,
      thoughts: null
    }
  }

  handleChange = (event) => {
    // merge state and updateField
    // assign updated to this.state.book
    this.setState({ thoughts: event.target.value })
    console.log('this.state.thoughts is', this.state.thoughts)
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { msgAlert } = this.props

    axios({
      url: `${apiUrl}/singleCardSpreads/${this.props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        'singleCardSpread': {
          'thoughts': `${this.state.thoughts}`
        }
      }
    })
      .then(() => msgAlert({
        heading: 'Update Single Card Spread Thought Success',
        message: messages.updateSCSSuccessful,
        variant: 'success'
      }))
      .catch(error => msgAlert({
        heading: 'Update Single Card Spread Thought Failure ' + error.message,
        message: messages.updateSCSFailure,
        variant: 'danger'
      }))
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
        let tarotImage
        const thoughts = res.data.singleCardSpread.thoughts
        if (res.data.singleCardSpread.firstCardObject.arcana === 'major') {
          if (res.data.singleCardSpread.firstCardState === 'analog') {
            tarotCard = res.data.singleCardSpread.firstCardObject.majorArcana.analog
            tarotImage = res.data.singleCardSpread.firstCardObject.majorArcana.analog.analogFaceIMG
          } else {
            tarotCard = res.data.singleCardSpread.firstCardObject.majorArcana.echo
            tarotImage = res.data.singleCardSpread.firstCardObject.majorArcana.echo.echoFaceIMG
          }
        } else {
          if (res.data.singleCardSpread.firstCardObject.firstCardState === 'analog') {
            tarotCard = res.data.singleCardSpread.firstCardObject.minorArcana.analog
            tarotImage = res.data.singleCardSpread.firstCardObject.minorArcana.analog.analogFaceIMG
          } else {
            tarotCard = res.data.singleCardSpread.firstCardObject.minorArcana.echo
            tarotImage = res.data.singleCardSpread.firstCardObject.minorArcana.echo.echoFaceIMG
          }
        }
        this.setState({ tarotCard, tarotImage, thoughts })
        // this.setState({ tarotImage })
        // this.setState({ thoughts })
      })
      .catch(console.error)
  }

  render () {
    const { tarotCard, tarotImage } = this.state

    if (!tarotCard) {
      return 'Loading...'
    }
    if (!tarotImage) {
      return 'Loading...'
    }
    // if (!thoughts) {
    //   return 'Loading...'
    // }
    return (
      <ScsContainer>
        <Row>
          <Col>
            <SCSImage style={{ width: 'inherit' }} image={tarotImage}/>
          </Col>
          <Col>
            <SCSDetails details={tarotCard}/>
          </Col>
          <Col>
            <SCSUpdateForm
              thoughts={this.state.thoughts}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          </Col>
        </Row>
      </ScsContainer>
    )
  }
}

export default SingleCardSpread
