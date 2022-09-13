import React, { useEffect, useRef, useCallback } from 'react'
import '../App.css'
import fixTwoDecimalPlaces from '../services/fixTwoDecimalPlaces'
import truncate from '../services/truncate'
import { useSetShoppingCartItems, useShoppingCartItems } from '../contexts/ShoppingCartProvider'
import useCreateNotification from '../hooks/useCreateNotification'

export default function CartItem({item}) { 
    const itemRef = useRef()
    const MAX_LENGTH = 68
    const setCartItems = useSetShoppingCartItems()

    useEffect(() => {
        itemRef.current.onanimationend = () => {
            itemRef.current.classList.remove('fade-in')
            itemRef.current.onanimationend = undefined
        }
        itemRef.current.classList.add('fade-in')
    }, [])
  
    const updateCount = useCallback((event) => {
      if (event.target.value < 1) return event.target.value = 1
      
      setCartItems(oldCartItems => {
        const thisItem = oldCartItems.find(cartItem => cartItem.title === item.title)
        thisItem.count = Number(event.target.value)
        return [...oldCartItems]
      })
    }, [item, setCartItems])

    return (
        <li ref={itemRef} className='cart-item'>
            <RemoveFromCartButton item={item} itemRef={itemRef}/>
            <img alt={item.title} className="cart-item-picture" src={item.thumbnail}/>
            <div className='cart-item-details'>
                <span className="cart-item-name">{truncate(item.title, MAX_LENGTH)}</span>
                <input className='cart-item-count' type="number" value={item.count} 
                    onKeyUp={updateCount} onChange={updateCount} onInput={updateCount}/>
                <span className="cart-item-price">{`$ ${fixTwoDecimalPlaces(item.price)}`}</span>
            </div>
        </li>
    )
}

function RemoveFromCartButton({item, itemRef}) {
    const cartItems = useShoppingCartItems()
    const setCartItems = useSetShoppingCartItems()
    const createNotification = useCreateNotification()

    const removeItemFromCart = useCallback(() => {
        createNotification(
            {
                "text":`${truncate(item.title, 30)} removed from cart successfully.`,
                "type":"REMOVAL",
                "clean": true,
                "undo": {
                    "cartSnapshot":cartItems
                },
                "duration": 5
            }
        )

        itemRef.current.onanimationend = () => {
            setCartItems(oldCartItems => 
                oldCartItems.filter(
                    cartItem => cartItem.title !== item.title
                )
            )
        }

        itemRef.current.classList.add('fade-out')
    }, [item.title, cartItems, itemRef, setCartItems, createNotification])

    function confirmRemoval() {
        if (window.confirm("Are you sure you want to remove this item?")) removeItemFromCart()
    }

    return (
        <button onClick={confirmRemoval} 
        className='closing-button'>✕</button>
    )
}