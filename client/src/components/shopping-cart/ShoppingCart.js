import React from 'react'
import CartItem from './CartItem';
import '../../App.css'
import { useShoppingCartItems } from '../../contexts/ShoppingCartProvider';
import CartDetails from './CartDetails';

function ShoppingCart({isLoading}) {
    const cartItems = useShoppingCartItems()

    if (isLoading || !cartItems || cartItems.length < 1) {
        return <></>
    }

    return (
        <ul className='shopping-cart'>
            <CartDetails />
            {cartItems.map(item => <CartItem key={item.id} className="cart-item" item={item}/>)}
        </ul>
    )
}

export default ShoppingCart