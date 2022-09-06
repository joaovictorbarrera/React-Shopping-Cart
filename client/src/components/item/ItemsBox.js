import React, { useCallback, useEffect, useState } from 'react'
import '../../App.css'
import { useAppStatus, useSetAppStatus } from '../../contexts/AppStatusProvider'
import useFetch from '../../hooks/useFetch'
import useLocalStorage from '../../hooks/useLocalStorage'
import Item from './Item'

function ItemsBox() {
  const appStatus = useAppStatus()
  const setAppStatus = useSetAppStatus()


  const [items, setItems] = useState()
  const URL = "http://localhost:4000/items"
  const fetch = useFetch()

  useEffect(() => {
    fetch(URL).then(data => {
      if (!data || !data.items) return setAppStatus("failed")
      setItems(data.items)
      setAppStatus("done")
    })
  }, [setAppStatus, fetch])

  const [itemsPerPage, setItemsPerPage] = useLocalStorage("itemsPerPage", "32")
  const handleSelectChange = useCallback(
    (event) => {
      setItemsPerPage(event.target.value)
    },
    [setItemsPerPage],
  )

  if (appStatus === "loading") {
    return (
      <div> Loading... </div>
    )
  }

  if (appStatus === "failed") {
    return (
      <div> Our servers are down at this time. </div>
    )
  }
  
  return (
    <div className='items-box'>
      <div className='items-box-top'>
        <h1>PRODUCTS</h1>
        <span>Items per page:</span>
        <select value={itemsPerPage} onChange={handleSelectChange}>
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="32">32</option>
          <option value="64">64</option>
        </select>
      </div>
      <ul>
        {items.map((item, index) => {
          if (index >= Number(itemsPerPage)) return <></>
          return <Item key={item.id} item={item}/>
        })}
      </ul>
    </div>
  )
}

export default ItemsBox