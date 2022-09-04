import React from 'react'
import '../../App.css'
import fixTwoDecimalPlaces from '../../services/fixTwoDecimalPlaces'

function Subtotal({totalPrice}) {
  return (
    <span className='subtotal'>Subtotal: $ {fixTwoDecimalPlaces(totalPrice)}</span>
  )
}

export default Subtotal