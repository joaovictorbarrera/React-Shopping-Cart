import React, { useCallback, useState } from 'react'
import '../App.css'
import truncate from '../services/truncate'
import fixTwoDecimalPlaces from '../services/fixTwoDecimalPlaces'
import Modal from './Modal'
import { useSetShoppingCartItems, useShoppingCartItems } from '../contexts/ShoppingCartProvider'
import useCreateNotification from '../hooks/useCreateNotification'

export default function Item({item}) {
  const MAX_LENGTH = 68
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = useCallback((event) => {
    if (event.target.className === "add-to-cart-button") return
    setModalOpen(true)
  }, [setModalOpen])

  const closeModal = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

  return (
    <>
      <Modal item={item} open={modalOpen} onClose={closeModal}/>

      <li onClick={openModal} className='item'>
        <div className='item-picture'>
          <img alt={item.title} src={item.thumbnail}/>
        </div>
        <div className='item-details'>
            <p className='item-name'>{`${truncate(item.title, MAX_LENGTH)}`}</p>
            <p className='item-price'><strong>{`$ ${fixTwoDecimalPlaces(item.price)}`}</strong></p>
            <AddToCartButton item={item} />
        </div>
      </li>
    </>
    )
}


function AddToCartButton({item}) {
  const cartItems = useShoppingCartItems()
  const setCartItems = useSetShoppingCartItems()
  const createNotification = useCreateNotification()

  const addToCart = useCallback(
    () => {
      // create notification
      createNotification(
        {
          "text":`${truncate(item.title, 30)} added to cart successfully.`,
          "type":"SUCCESS",
          "duration": 1,
        }
      )
                                          
      // add to cart
      const thisItem = cartItems.find(cartItem => cartItem.title === item.title)
      if (thisItem) {
          setCartItems(oldCartItems => {
            const thisItem = oldCartItems.find(cartItem => cartItem.title === item.title)
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