import React from 'react'

const SCSUpdateForm = ({ thoughts, handleChange, handleSubmit, handleDelete }) => (
  <form onSubmit={handleSubmit}>
    <label>How do you feel about this reading at the present moment?</label>
    <textarea
      placeholder="TBD"
      rows="10"
      value={thoughts}
      name="thoughts"
      onChange={handleChange}
    />

    <button type="submit">Update</button>
    <button onClick={handleDelete}>Delete</button>
  </form>
)

export default SCSUpdateForm
