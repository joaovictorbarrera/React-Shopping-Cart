import React, { useEffect, useState } from 'react'
import PayButton from './PayButton'
import Subtotal from './Subtotal'
import '../../App.css'
import { useShoppingCartItems } from '../../contexts/ShoppingCartProvider'

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
            <Subtotal totalPrice={totalPrice}/>
            <PayButton />
        </li>
    )
}

export default CartDetails