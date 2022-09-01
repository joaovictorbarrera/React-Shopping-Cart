import React from 'react'
import '../App.css'

function ItemsBox({children}) {
  return (
    <div className='items-box'>{children}</div>
  )
}

export default ItemsBox