import React, { useEffect, useState, useMemo, useCallback } from 'react'
import CartItem from './CartItem';
import '../App.css'
import { useSetShoppingCartItems, useShoppingCartItems } from '../contexts/ShoppingCartProvider';
import fixTwoDecimalPlaces from '../services/fixTwoDecimalPlaces';

export default function ShoppingCart({isLoading}) {
    const cartItems = useShoppingCartItems()

    const cartItemsList = useMemo(() => 
    cartItems.map(
        item => <CartItem key={item.id} className="cart-item" item={item}/>
    ), [cartItems])

    if (isLoading || !cartItems || cartItems.length < 1) {
        return <></>
    }

    return (
        <ul className='shopping-cart'>
            <CartDetails />
            {cartItemsList}
        </ul>
    )
}

function CartDetails() {
    const cartItems = useShoppingCartItems()
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        setTotalPrice(
            Math.round(
                (cartItems.reduce((total, item) => total + item.price * item.count, 0) 
            + Number.EPSILON) 
            * 100) / 100 
            
        )
    }, [cartItems])

    return (
        <li className='cart-details'>
            <h3>MY CART</h3>
            <span className='subtotal'>Subtotal: $ {fixTwoDecimalPlaces(totalPrice)}</span>
            <PayButton />
        </li>
    )
}

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
