import React, { useCallback } from 'react'
import '../../App.css'
import { useSetShoppingCartItems, useShoppingCartItems } from '../../contexts/ShoppingCartProvider'


function RemoveFromCartButton({item, itemRef}) {
    const cartItems = useShoppingCartItems()
    const setCartItems = useSetShoppingCartItems()

    const removeItemFromCart = useCallback(() => {
        console.log("removing from cart")
        itemRef.current.onanimationend = () => {
            console.log("filtering cart")
            setCartItems(
                JSON.stringify(
                    cartItems.filter(
                        cartItem => cartItem.name !== item.name
                    )
                )
            )
        }

        itemRef.current.classList.add('fade-out')
    }, [cartItems, item.name, itemRef, setCartItems])

    function confirmRemoval() {
        if (window.confirm("Are you sure you want to remove this item?")) removeItemFromCart()
    }

    return (
        <button onClick={confirmRemoval} className='remove-from-cart-button'>X</button>
    )
}

export default RemoveFromCartButton