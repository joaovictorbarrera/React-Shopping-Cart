import React, { useEffect, useState } from 'react'
import CartItem from './CartItem';
import '../../App.css'
import { useShoppingCartItems } from '../../contexts/ShoppingCartProvider';
import CartDetails from './CartDetails';

function ShoppingCart() {
    const cartItems = useShoppingCartItems()
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        setTotalPrice(
            cartItems.reduce(
                (total, item) => total + item.price * item.count, 0
            )
        )
    }, [cartItems])

    return (
        <ul className='shopping-cart'>
            <li><h3>MY CART</h3></li>
            {cartItems.map((item, index) => <CartItem key={index} className="cart-item" item={item}/>)}
            <CartDetails totalPrice={totalPrice} />
        </ul>
    )
}

export default ShoppingCart