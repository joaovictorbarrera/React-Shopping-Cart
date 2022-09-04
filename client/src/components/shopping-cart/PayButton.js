import React, { useCallback } from 'react'
import '../../App.css'
import { useSetShoppingCartItems, useShoppingCartItems } from '../../contexts/ShoppingCartProvider'
function PayButton() {
  const cartItems = useShoppingCartItems()
  const setCartItems = useSetShoppingCartItems()

  const pay = useCallback(() => {
    // placeholder
    if (cartItems.length > 0) {
      window.location.reload()
      setCartItems([])
    } else {
      window.alert("Cart is empty.")
    }
  }, [cartItems, setCartItems])
  return (
    <button className='pay-button' onClick={pay}>Pay Now</button>
  )
}

export default PayButton