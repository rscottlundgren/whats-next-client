import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import SingleCardSpreadForm from '../SingleCardSpreadForm/SingleCardSpreadForm'

const CreateSingleCardSpread = (props) => {
  const [question, setQuestion] = useState('')
  const [createdSingleCardSpreadId, setCreatedSingleCardSpreadId] = useState(null)

  const handleChange = event => {
    event.persist()
    setQuestion(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/singleCardSpreads`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: {
        'singleCardSpread': {
          question
        }
      }
    })
      .then(res => {
        setCreatedSingleCardSpreadId(res.data.singleCardSpread._id)
        console.log(res)
        return res
      })
      .catch(console.error)
  }

  if (createdSingleCardSpreadId) {
    return <Redirect to={`/scs/${createdSingleCardSpreadId}`} />
  }

  return (
    <SingleCardSpreadForm
      question={question}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default CreateSingleCardSpread
