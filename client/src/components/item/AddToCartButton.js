import React, { useCallback } from 'react'
import '../../App.css'
import { useSetShoppingCartItems, useShoppingCartItems } from '../../contexts/ShoppingCartProvider'
import useCreateNotification from '../../hooks/useCreateNotification'
import truncate from '../../services/truncate'

function AddToCartButton({item}) {

  const cartItems = useShoppingCartItems()
  const setCartItems = useSetShoppingCartItems()
  const createNotification = useCreateNotification()

  const addToCart = useCallback(
    () => {
      // create notification
      createNotification(
        `${truncate(item.name, 30)} added to cart successfully.`,
        "SUCCESS"
      )
      
      // add to cart
      const thisItem = cartItems.find(cartItem => cartItem.name === item.name)
      if (thisItem) {
          thisItem.count += 1
          setCartItems([...cartItems])
      } else {
          item.count = 1
          setCartItems([item, ...cartItems])
      }
    }, [cartItems, setCartItems, item, createNotification]
  )

  return (
    <button onClick={addToCart} className='add-to-cart-button'>Add to cart</button>
  )
}

export default AddToCartButton