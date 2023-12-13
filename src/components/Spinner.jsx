import React from 'react'
import SpinnerImg from "./assets/spinner.gif"

function Spinner() {
  return (
    <div className='w-100 mt-20'>
      <img src={SpinnerImg} alt="Loading..." width={100} className='text-center mx-auto' />
    </div>
  )
}

export default Spinner
