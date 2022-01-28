import React from 'react'
import spinnerImg from '../../images/spinner.gif' // import the spinner gif

const Spinner = () => (
  <div className="spinner-wrapper">
    <img src={spinnerImg} alt="" className="spinner" />
  </div>
)

export default Spinner