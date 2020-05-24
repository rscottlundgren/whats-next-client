import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'
import { Link, withRouter } from 'react-router-dom'

class SCSIndex extends Component {
  constructor () {
    super()
    this.state = {
      spreads: null
    }
  }

  handleDelete = (event, id) => {
    event.preventDefault()

    const { msgAlert } = this.props
    console.log('Yo Mama')
    axios({
      url: `${apiUrl}/singleCardSpreads/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => msgAlert({
        heading: 'Delete Single Card Spread Thought Success',
        message: messages.deleteSCSThoughtsSuccessful,
        variant: 'success'
      }))
      .then(() => {
        axios({
          url: `${apiUrl}/singleCardSpreads`,
          method: 'GET',
          headers: {
            'Authorization': `Token token=${this.props.user.token}`
          }
        })
          .then(res => {
            this.setState({ spreads: res.data.singleCardSpreads })
          })
          .catch(error => msgAlert({
            heading: 'Index All Single Card Spreads Failure ' + error.message,
            message: messages.indexSCSFailure,
            variant: 'danger'
          }))
      })
      .catch(error => msgAlert({
        heading: 'Delete Single Card Spread Thought Failure ' + error.message,
        message: messages.deleteSCSThoughtsFailure,
        variant: 'danger'
      }))
  }

  componentDidMount () {
    const { msgAlert } = this.props

    axios({
      url: `${apiUrl}/singleCardSpreads`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(res => {
        this.setState({ spreads: res.data.singleCardSpreads })
      })
      .catch(error => msgAlert({
        heading: 'Index All Single Card Spreads Failure ' + error.message,
        message: messages.indexSCSFailure,
        variant: 'danger'
      }))
  }

  render () {
    const { spreads } = this.state

    let spreadIndexJsx = ''

    if (!spreads) {
      spreadIndexJsx = 'Loading...'
    } else if (spreads === null) {
      spreadIndexJsx = <h2>You Have No Spreads To Display</h2>
    } else {
      spreadIndexJsx = (
        <ol>
          {spreads.map(spread => (
            <li key={spread._id}>
              {spread.createdAt} | <Link to={`/scs/${spread._id}`}>{spread.question}</Link>
              <button onClick={(event) => this.handleDelete(event, spread._id)}>Delete This Reading</button>
            </li>
          ))}
        </ol>
      )
    }

    return (
      <div>
        <h1>Single Card Spread Reading Listing</h1>
        <h3>(If You Do Not See Any Spreads Below, Make One Above)</h3>
        {spreadIndexJsx}
      </div>
    )
  }
}

export default withRouter(SCSIndex)
