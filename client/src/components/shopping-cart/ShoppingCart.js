import React, { useMemo } from 'react'
import CartItem from './CartItem';
import '../../App.css'
import { useShoppingCartItems } from '../../contexts/ShoppingCartProvider';
import CartDetails from './CartDetails';

function ShoppingCart({isLoading}) {
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

export default ShoppingCart