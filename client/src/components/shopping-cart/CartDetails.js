import React from 'react'
import PayButton from './PayButton'
import Subtotal from './Subtotal'
import '../../App.css'

function CartDetails({totalPrice}) {
  return (
    <li className='cart-details'>
        <Subtotal totalPrice={totalPrice}/>
        <PayButton />
    </li>
  )
}

export default CartDetails