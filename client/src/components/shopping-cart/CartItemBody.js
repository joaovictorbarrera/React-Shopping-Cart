import React from 'react'

function CartItemBody({item}) {
  return (
    <>
        <img alt={item.name} className="cart-item-picture" src={item.picture}/>
        <div className='cart-item-details'>
            <span className="cart-item-name">{item.name}</span>
            <span className='cart-item-count'>{"count:" + item.count}</span>
            <span className="cart-item-price">{`$${item.price}`}</span>
        </div>
    </>
  )
}

export default CartItemBody