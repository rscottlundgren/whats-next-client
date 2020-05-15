import React from 'react'

const SingleCardSpreadForm = ({ question, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <label>What is your query?</label>
    <input
      placeholder="e.x. What is the biggest obstacle that stands in my way today?"
      value={question}
      name="question"
      onChange={handleChange}
    />

    <button type="submit">Submit</button>
  </form>
)

export default SingleCardSpreadForm
