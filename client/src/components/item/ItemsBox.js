import React from 'react'
import '../../App.css'

function ItemsBox({children}) {
  return (
    <ul className='items-box'>{children}</ul>
  )
}

export default ItemsBox