import React, { useEffect, useState } from 'react'
import '../../App.css'
import Item from './Item'

function ItemsBox({isLoading, setLoading}) {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/items")
    .then(res => res.json())
    .then(data => {
      setItems(data.items)
      setLoading(false)
    })
  }, [setLoading])

  if (isLoading) {
    return (
      <div> Loading... </div>
    )
  }
  
  return (
    <div className='items-box'>
      <h1>PRODUCTS</h1>
      <ul>
        {items.map(item => <Item key={item.id} item={item}/>)}
      </ul>
    </div>
  )
}

export default ItemsBox