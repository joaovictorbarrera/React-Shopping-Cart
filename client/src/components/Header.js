import React, { useCallback, useEffect, useState } from 'react'
import "../App.css"
import { useAppStatus } from '../contexts/AppStatusProvider'
import { useShoppingCartItems } from '../contexts/ShoppingCartProvider'

function Header() {
    const cartItems = useShoppingCartItems()
    const [active, setActive] = useState(false)
    const appStatus = useAppStatus()

    useEffect(() => {
        if (cartItems.length !== 0) setActive(true)
        else setActive(false)
    }, [cartItems])

    const scrollToCart = useCallback(
      () => {
        if (active) {
            window.scrollTo({
                top: document.querySelector(".shopping-cart").getBoundingClientRect().top,
                behavior: 'smooth'
            });
        }
      }, [active]
    )

    return (
        <div className='header-wrapper'>
            <div className='header-items'>
                <h1 className='title'>React Shopping Cart</h1>
                {appStatus !== "done" ? <></> : 
                <div onClick={scrollToCart} className={`header-cart-icon-wrapper ${active ? "active" : ""}`}>
                    <img alt="shopping cart icon" 
                    src='/shopping-cart-outline.svg' className='header-shopping-cart-icon' />
                    {active ? <span className='floating-cart-count'>{cartItems.length}</span> : <></>}
                </div>}
            </div>
        </div>
    )
}

export default Header