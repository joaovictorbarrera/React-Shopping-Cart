import React from 'react'
import '../../App.css'
import ItemDetails from './ItemDetails'

function Item({item}) {
  return (
    <li className='item'>
        <div className="item-picture">
          <img alt={item.name} src={item.picture}/>
        </div>
        <ItemDetails item={item} />
    </li>
  )
}

export default Item