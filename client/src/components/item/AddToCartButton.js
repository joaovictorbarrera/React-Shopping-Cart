import React, { useCallback } from 'react'
import '../../App.css'
import { useSetShoppingCartItems, useShoppingCartItems } from '../../contexts/ShoppingCartProvider'

function AddToCartButton({item}) {

  const cartItems = useShoppingCartItems()
  const setCartItems = useSetShoppingCartItems()

  const addToCart = useCallback(
    () => {
    const similarItem = cartItems.find(cartItem => cartItem.name === item.name)
    if (similarItem) {
        similarItem.count += 1
        setCartItems([...cartItems])
    } else {
        item.count = 1
        setCartItems([item, ...cartItems])
    }
    }, [cartItems, setCartItems, item]
  )

  return (
    <button onClick={addToCart} className='add-to-cart-button'>Add to cart</button>
  )
}

export default AddToCartButton