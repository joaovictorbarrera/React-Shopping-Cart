import React, { useEffect, useRef, useCallback } from 'react'
import '../../App.css'
import RemoveFromCartButton from './RemoveFromCartButton'
import { useSetShoppingCartItems } from '../../contexts/ShoppingCartProvider'
import fixTwoDecimalPlaces from '../../services/fixTwoDecimalPlaces'
import truncate from '../../services/truncate'

function CartItem({item}) { 
    const itemRef = useRef()
    const MAX_LENGTH = 100
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
        const thisItem = oldCartItems.find(cartItem => cartItem.name === item.name)
        thisItem.count = Number(event.target.value)
        return [...oldCartItems]
      }
        )
    }, [item, setCartItems])

    return (
        <li ref={itemRef} className='cart-item'>
            <RemoveFromCartButton item={item} itemRef={itemRef}/>
            <img alt={item.name} className="cart-item-picture" src={item.picture}/>
            <div className='cart-item-details'>
                <span className="cart-item-name">{truncate(item.name, MAX_LENGTH)}</span>
                <input className='cart-item-count' type="number" value={item.count} 
                    onKeyUp={updateCount} onChange={updateCount} onInput={updateCount}/>
                <span className="cart-item-price">{`$ ${fixTwoDecimalPlaces(item.price)}`}</span>
            </div>
        </li>
    )
}

export default CartItem