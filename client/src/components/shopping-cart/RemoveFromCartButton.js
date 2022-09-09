import React, { useCallback } from 'react'
import '../../App.css'
import { useSetShoppingCartItems, useShoppingCartItems } from '../../contexts/ShoppingCartProvider'
import useCreateNotification from '../../hooks/useCreateNotification'
import truncate from '../../services/truncate'

function RemoveFromCartButton({item, itemRef}) {
    const cartItems = useShoppingCartItems()
    const setCartItems = useSetShoppingCartItems()
    const createNotification = useCreateNotification()

    const removeItemFromCart = useCallback(() => {
        createNotification(
            {
                "text":`${truncate(item.name, 30)} removed from cart successfully.`,
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
                    cartItem => cartItem.name !== item.name
                )
            )
        }

        itemRef.current.classList.add('fade-out')
    }, [item.name, cartItems, itemRef, setCartItems, createNotification])

    function confirmRemoval() {
        if (window.confirm("Are you sure you want to remove this item?")) removeItemFromCart()
    }

    return (
        <button onClick={confirmRemoval} 
        className='closing-button'>✕</button>
    )
}

export default RemoveFromCartButton