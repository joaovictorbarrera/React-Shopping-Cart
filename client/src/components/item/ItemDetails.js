import React from 'react'
import AddToCartButton from './AddToCartButton'
import '../../App.css'
import truncate from '../../services/truncate'
import fixTwoDecimalPlaces from '../../services/fixTwoDecimalPlaces'

function ItemDetails({item}) {
    const MAX_LENGTH = 68
    return (
        <div className='item-details'>
            <p>{`${truncate(item.name, MAX_LENGTH)}`}</p>
            <p><strong>{`$ ${fixTwoDecimalPlaces(item.price)}`}</strong></p>
            <AddToCartButton item={item} />
        </div>
    )
}

export default ItemDetails