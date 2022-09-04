import React, { useCallback } from 'react'
import { useSetShoppingCartItems, useShoppingCartItems } from '../../contexts/ShoppingCartProvider'
import fixTwoDecimalPlaces from '../../services/fixTwoDecimalPlaces'
import truncate from '../../services/truncate'

function CartItemBody({item}) {
  const MAX_LENGTH = 100

  const cartItems = useShoppingCartItems()
  const setCartItems = useSetShoppingCartItems()

  const updateCount = useCallback((event) => {
    if (event.target.value < 1) return event.target.value = 1
    const thisItem = cartItems.find(cartItem => cartItem.name === item.name)
    thisItem.count = Number(event.target.value)
    setCartItems([...cartItems])
  }, [item, cartItems, setCartItems])

  return (
    <>
      <img alt={item.name} className="cart-item-picture" src={item.picture}/>
      <div className='cart-item-details'>
          <span className="cart-item-name">{truncate(item.name, MAX_LENGTH)}</span>
          <input className='cart-item-count' type="number" value={item.count} 
            onKeyUp={updateCount} onChange={updateCount} onInput={updateCount}/>
          <span className="cart-item-price">{`$ ${fixTwoDecimalPlaces(item.price)}`}</span>
      </div>
    </>
  )
}

export default CartItemBody