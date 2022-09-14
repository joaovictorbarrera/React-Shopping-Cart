import React, { useCallback, useEffect, useMemo, useState } from 'react'
import '../App.css'
import { useAppStatus, useSetAppStatus } from '../contexts/AppStatusProvider'
import useCreateNotification from '../hooks/useCreateNotification'
import useFetch from '../hooks/useFetch'
import useLocalStorage from '../hooks/useLocalStorage'
import Item from './Item'

export default function ItemsBox() {
  console.log("rendered")
  const URL = "http://192.168.0.3:4000/items"
  const fetchHook = useFetch()
  const createNotification = useCreateNotification()
  const orders = useMemo(() => {
    return {
      "No Order": (items) => items,
      "Alphabetic": (items) => [...items].sort((a, b) => a.title >= b.title ? 1 : -1),
      "Alphabetic Reverse": (items) => [...items].sort((a, b) => a.title < b.title ? 1 : -1),
      "Price Ascending": (items) => [...items].sort((a, b) => a.price >= b.price ? 1 : -1),
      "Price Descending": (items) => [...items].sort((a, b) => a.price < b.price ? 1 : -1)
    }
  }, [])

  const appStatus = useAppStatus()
  const setAppStatus = useSetAppStatus()

  const [rawItems, setRawItems] = useState([])
  const [paginatedItems, setPaginatedItems] = useState([])

  const [itemsPerPage, setItemsPerPage] = useLocalStorage("itemsPerPage", "32")
  const [currentPage, setCurrentPage] = useLocalStorage("currentPage", "1")

  const [selectedCategory, setSelectedCategory] = useLocalStorage("selectedCategory", "All")
  const [selectedOrder, setSelectedOrder] = useLocalStorage("selectedOrder", "No Order")

  useEffect(() => {
    fetchHook(URL).then(data => {
      if (!data?.items) return setAppStatus("failed")
      setAppStatus("done")
      setRawItems(data.items)
    })
  }, [setAppStatus, fetchHook])

  const filterByCategory = useCallback((items) => {
    if (selectedCategory === null || selectedCategory === "All") return items
    return items.filter(item => item.category === selectedCategory)
  }, [selectedCategory])

  const orderBy = useCallback((items) => {
    if (selectedOrder === null) return items
    return orders[selectedOrder](items)
  }, [selectedOrder, orders])

  const createPagination = useCallback(() => {
    const items = orderBy(filterByCategory(rawItems))
    const pages = []
    let currentItem = 0
    while (currentItem < items.length) {
      const page = []
      const startingItem = currentItem
      while (currentItem - startingItem < itemsPerPage && currentItem < items.length) {
        const item = items[currentItem]
        page.push(<Item key={item.id} item={item}/> )
        currentItem++
      }
      pages.push(page)
    }

    setPaginatedItems(pages)
  }, [itemsPerPage, rawItems, filterByCategory, orderBy])

  useEffect(createPagination, 
    [createPagination, itemsPerPage])
    
  
  const handleItemsPerPageChange = useCallback(
    (event) => {
      setItemsPerPage(event.target.value)
      setCurrentPage("1")
      createNotification(
        {
          "text":`Successfully updated to ${event.target.value} items per page.`,
          "type":"WARNING",
          "duration": 2,
          "clean":true
        }
      )
    },[setItemsPerPage, createNotification, setCurrentPage]
  )

  // FILTER
  const getListOfCategories = useCallback(() => {
    return ["All", ...new Set(rawItems.map(item => item.category))]
  }, [rawItems])

  const handleFilterChange = useCallback((event) => {
    setSelectedCategory(event.target.value)
    setCurrentPage("1")
    createNotification(
      {
        "text":`Successfully updated filter option to "${event.target.value}".`,
        "type":"WARNING",
        "duration": 2,
        "clean":true
      }
    )
  }, [setSelectedCategory, createNotification, setCurrentPage])

  // Order by
  const handleOrderChange = useCallback((event) => {
    setSelectedOrder(event.target.value)
    setCurrentPage("1")
    createNotification(
      {
        "text":`Successfully updated order option to "${event.target.value}".`,
        "type":"WARNING",
        "duration": 2,
        "clean":true
      }
    )
  }, [setSelectedOrder, setCurrentPage, createNotification])

  if (appStatus === "loading") return (
    <div className='loading-container'> 
      <div class="spinner"></div>
      <span>Loading... </span> 
    </div>
  )
  if (appStatus === "failed") return <div> Our servers are down at this time. </div>

  return (
    <div className='items-box'>

      <div className='items-box-top'>
        <div>
          <h1>PRODUCTS</h1>
          <ItemsPerPage itemsPerPage={itemsPerPage} onChange={handleItemsPerPageChange} />
        </div>
        <div>
          <Filter categories={getListOfCategories()} selectedCategory={selectedCategory} onChange={handleFilterChange}/>
          <OrderBy orders={Object.keys(orders)} selectedOrder={selectedOrder} onChange={handleOrderChange}/>
        </div>
      </div>

      <ul>
        {paginatedItems[currentPage - 1]}
      </ul>

      <Pagination currentPage={Number(currentPage)} setCurrentPage={setCurrentPage} amountOfPages={paginatedItems.length}/>
    </div>
  )
}

function OrderBy({orders, selectedOrder, onChange}) {
  return (
  <div className='order-by-container'>
    <span>Order by:</span>
    <select value={selectedOrder} onChange={onChange}>
      {orders.map(order => <option key={order}>{order}</option>)}
    </select>
  </div>
  )
}

function Filter({categories, selectedCategory, onChange}) {
  return (
    <div className='filter-by-container'>
      <span>Filter by category:</span>
      <select value={selectedCategory} onChange={onChange}>
        {categories?.map(category => <option key={category}>{category}</option>)}
      </select>
    </div>
  )
}


function ItemsPerPage({itemsPerPage, onChange}) {
  return (
    <div className='items-per-page'>
      <span>Items per page:</span>
      <select value={itemsPerPage} onChange={onChange}>
        <option value="8">8</option>
        <option value="16">16</option>
        <option value="32">32</option>
        <option value="64">64</option>
      </select>
    </div>
  )
}

function Pagination({currentPage, setCurrentPage, amountOfPages}) {
  const scrollTop = useCallback(() => {
      window.scrollTo({
          top: document.querySelector(".items-box").getBoundingClientRect().top,
          behavior: 'smooth'
      });
  }, [])

  const handleGoBack = useCallback(() => {
      if (currentPage === 1) return
      setCurrentPage(curr => String(Number(curr) - 1))
      scrollTop()
  }, [currentPage, setCurrentPage, scrollTop])

  const handleGoForward = useCallback(() => {
      if (currentPage >= amountOfPages) return
      setCurrentPage(curr => String(Number(curr) + 1))
      scrollTop()
  }, [currentPage, amountOfPages, setCurrentPage, scrollTop])

  return (
      <div className='pagination-wrapper'>
          <button className='pagination-button left' onClick={handleGoBack}>
              {'<'}
          </button>
          <div className='pagination-text'>
              Page {currentPage} of {amountOfPages}
          </div>
          <button className='pagination-button right' onClick={handleGoForward}>  
              {'>'}
          </button>
      </div>
  )
}
