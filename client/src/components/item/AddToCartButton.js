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
        {
          "text":`${truncate(item.name, 30)} added to cart successfully.`,
          "type":"SUCCESS",
          "duration": 1,
        }
      )
                                          
      // add to cart
      const thisItem = cartItems.find(cartItem => cartItem.name === item.name)
      if (thisItem) {
          setCartItems(oldCartItems => {
            const thisItem = oldCartItems.find(cartItem => cartItem.name === item.name)
            thisItem.count += 1
            return [...oldCartItems]
          })
      } else {
          item.count = 1
          setCartItems(oldCartItems => [item, ...oldCartItems])
      }
    }, [item, createNotification, cartItems, setCartItems]
  )

  return (
    <button onClick={addToCart} className='add-to-cart-button'>Add to cart</button>
  )
}

export default AddToCartButton