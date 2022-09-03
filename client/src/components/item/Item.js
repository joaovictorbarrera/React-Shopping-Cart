import React from 'react'
import '../../App.css'
import ItemDetails from './ItemDetails'

function Item({item}) {
  return (
    <li className='item'>
        <img alt={item.name} className="item-picture" src={item.picture}/>
        <ItemDetails item={item} />
    </li>
  )
}

export default Item