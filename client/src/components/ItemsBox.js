import React, { useCallback, useEffect, useMemo } from 'react'
import '../App.css'
import { useAppStatus } from '../contexts/AppStatusProvider'
import useFilterByCategory from '../hooks/useFilterByCategory'
import useItems from '../hooks/useItems'
import useOrderMapping from '../hooks/useOrderMapping'
import usePagination from '../hooks/usePagination'
import useOrderBy from '../hooks/useOrderBy'
import useItemsPerPage from '../hooks/useItemsPerPage'
import useCurrentPage from '../hooks/useCurrentPage'

export default function ItemsBox() {

  const [currentPage, setCurrentPage] = useCurrentPage(1)
  const [itemsPerPage, handleItemsPerPageChange] = useItemsPerPage("32")
  const [selectedCategory, handleCategoryChange] = useFilterByCategory("All")
  const [selectedOrder, handleOrderChange] = useOrderBy("No Order")
  
  const appStatus = useAppStatus()
  const rawItems = useItems()
  const paginatedItems = usePagination(rawItems, itemsPerPage, selectedOrder, selectedCategory)    
  
  useEffect(() => {
    console.log("called")
    setCurrentPage(1)
  }, [selectedCategory, selectedOrder, itemsPerPage, setCurrentPage])


  if (appStatus === "loading") return (
    <div className='loading-container'> 
      <div className="spinner"></div>
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
          <Filter rawItems={rawItems} selectedCategory={selectedCategory} onChange={handleCategoryChange}/>
          <OrderBy selectedOrder={selectedOrder} onChange={handleOrderChange}/>
        </div>
      </div>

      <ul>
        {paginatedItems[currentPage - 1]}
      </ul>

      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} amountOfPages={paginatedItems.length}/>
    </div>
  )
}

function OrderBy({selectedOrder, onChange}) {
  const orders = useOrderMapping()
  const ordersList = Object.keys(orders)

  return (
    <div className='order-by-container'>
      <span>Order by:</span>
      <select value={selectedOrder} onChange={onChange}>
        {ordersList.map(order => <option key={order}>{order}</option>)}
      </select>
    </div>
  )
}

function Filter({rawItems, selectedCategory, onChange}) {
  const categories = useMemo(() => 
    ["All", ...new Set(rawItems.map(item => item.category))], 
      [rawItems]
  )

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
      setCurrentPage(currentPage - 1)
      scrollTop()
  }, [currentPage, setCurrentPage, scrollTop])

  const handleGoForward = useCallback(() => {
      if (currentPage >= amountOfPages) return
      setCurrentPage(currentPage + 1)
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
