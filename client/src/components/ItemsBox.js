import React, { useCallback, useEffect, useState } from 'react'
import '../App.css'
import { useAppStatus, useSetAppStatus } from '../contexts/AppStatusProvider'
import useCreateNotification from '../hooks/useCreateNotification'
import useFetch from '../hooks/useFetch'
import useLocalStorage from '../hooks/useLocalStorage'
import Item from './Item'

export default function ItemsBox() {
  const URL = "http://192.168.0.3:4000/items"
  const fetch = useFetch()
  const createNotification = useCreateNotification()

  const appStatus = useAppStatus()
  const setAppStatus = useSetAppStatus()

  const [rawItems, setRawItems] = useState([])
  const [paginatedItems, setPaginatedItems] = useState([])
  const [currentPageItems, setCurrentPageItems]= useState([])

  const [itemsPerPage, setItemsPerPage] = useLocalStorage("itemsPerPage", "32")
  const [currentPage, setCurrentPage] = useLocalStorage("currentPage", "1")

  const createPagination = useCallback(() => {
    const pages = []
    let currentItem = 0
    while (currentItem < rawItems.length) {
      const page = []
      const startingItem = currentItem
      while (currentItem - startingItem < itemsPerPage && currentItem < rawItems.length) {
        const item = rawItems[currentItem]
        page.push(<Item key={item.id} item={item}/> )
        currentItem++
      }
      pages.push(page)
    }

    setPaginatedItems(pages)
  }, [itemsPerPage, rawItems])

  useEffect(() => {
    fetch(URL).then(data => {
      if (!data || !data.items) return setAppStatus("failed")
      setAppStatus("done")
      setRawItems(data.items)
    })
  }, [setAppStatus, fetch])

  useEffect(createPagination, 
    [createPagination, itemsPerPage])

  useEffect(() => {
    setCurrentPageItems(paginatedItems[Number(currentPage) - 1])
  }, [paginatedItems, currentPage])
    
  const handleSelectChange = useCallback(
    (event) => {
      setItemsPerPage(event.target.value)
      setCurrentPage("1")
      createNotification(
        {
          "text":`Successfully updated to ${event.target.value} items per page.`,
          "type":"WARNING",
          "duration": 1,
          "clean":true
        }
      )
    },[setItemsPerPage, createNotification, setCurrentPage]
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
        {currentPageItems}
      </ul>

      <Pagination currentPage={Number(currentPage)} setCurrentPage={setCurrentPage} amountOfPages={paginatedItems.length}/>
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
