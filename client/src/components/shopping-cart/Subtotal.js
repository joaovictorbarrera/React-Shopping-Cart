import React from 'react'
import '../../App.css'

function Subtotal({totalPrice}) {
  return (
    <span className='subtotal'>Subtotal: {totalPrice}$</span>
  )
}

export default Subtotal