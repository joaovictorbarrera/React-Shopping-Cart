import React, { useCallback } from 'react'
import '../../App.css'
import { useSetShoppingCartItems } from '../../contexts/ShoppingCartProvider'
import useCreateNotification from '../../hooks/useCreateNotification'
import truncate from '../../services/truncate'


function RemoveFromCartButton({item, itemRef}) {
    const setCartItems = useSetShoppingCartItems()
    const createNotification = useCreateNotification()

    const removeItemFromCart = useCallback(() => {
        createNotification(
            `${truncate(item.name, 30)} removed from cart successfully.`,
            "REMOVAL"
        )

        itemRef.current.onanimationend = () => {
            setCartItems(oldCartItems =>
                oldCartItems.filter(
                    cartItem => cartItem.name !== item.name
                )
            )
        }

        itemRef.current.classList.add('fade-out')
    }, [item.name, itemRef, setCartItems, createNotification])

    function confirmRemoval() {
        if (window.confirm("Are you sure you want to remove this item?")) removeItemFromCart()
    }

    return (
        <button onClick={confirmRemoval} 
        className='closing-button'>✕</button>
    )
}

export default RemoveFromCartButton