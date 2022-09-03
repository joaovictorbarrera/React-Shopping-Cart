import React, { useEffect, useRef } from 'react'
import '../../App.css'
import CartItemBody from './CartItemBody'
import RemoveFromCartButton from './RemoveFromCartButton'

function CartItem({item}) {
    
    const itemRef = useRef()

    useEffect(() => {
        if (item.count < 2) {
            itemRef.current.onanimationend = () => {
                itemRef.current.classList.remove('fade-in')
                itemRef.current.onanimationend = undefined
            }

            itemRef.current.classList.add('fade-in')
        }
    }, [itemRef, item.count])

    return (
        <li ref={itemRef} className='cart-item'>
            <RemoveFromCartButton item={item} itemRef={itemRef}/>
            <CartItemBody item={item} />
        </li>
    )
}

export default CartItem