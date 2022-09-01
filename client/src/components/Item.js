import React from 'react'
import '../App.css'
import AddToCartButton from './AddToCartButton'

function Item({item}) {
  return (
    <div className='item'>
        <img className="item-picture" src={item.picture}/>
        <div className='item-details'>
            <p>{`${item.name}`}</p>
            <p>{`${item.price}$`}</p>
            <AddToCartButton />
        </div>
    </div>
  )
}

export default Item