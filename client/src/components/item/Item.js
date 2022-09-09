import React from 'react'
import '../../App.css'
import AddToCartButton from './AddToCartButton'
import truncate from '../../services/truncate'
import fixTwoDecimalPlaces from '../../services/fixTwoDecimalPlaces'

function Item({item}) {
  const MAX_LENGTH = 68

  return (
    <li className='item'>

        <div className="item-picture">
          <img alt={item.name} src={item.picture}/>
        </div>

        <div className='item-details'>
            <p className='item-name'>{`${truncate(item.name, MAX_LENGTH)}`}</p>
            <p className='item-price'><strong>{`$ ${fixTwoDecimalPlaces(item.price)}`}</strong></p>
            <AddToCartButton item={item} />
        </div>
    </li>
  )
}

export default Item