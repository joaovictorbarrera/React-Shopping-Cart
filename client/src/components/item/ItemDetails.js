import React from 'react'
import AddToCartButton from './AddToCartButton'
import '../../App.css'

function ItemDetails({item}) {

  return (
    <div className='item-details'>
        <p>{`${item.name}`}</p>
        <p>{`${item.price}$`}</p>
        <AddToCartButton item={item} />
    </div>
  )
}

export default ItemDetails