import { useCallback, useEffect, useState } from 'react'
import Item from '../components/Item'
import useOrderMapping from './useOrderMapping'

export default function usePagination(rawItems, itemsPerPage, selectedOrder, selectedCategory) {
    const [paginatedItems, setPaginatedItems] = useState([])
    const orders = useOrderMapping()

    const filterByCategory = useCallback((items) => {
        if (selectedCategory === null || selectedCategory === "All") return items
        return items.filter(item => item.category === selectedCategory)
      }, [selectedCategory])
    
    const orderBy = useCallback((items) => {
        if (selectedOrder === null) return items
        return orders[selectedOrder](items)
    }, [selectedOrder, orders])
    
    useEffect(() => {
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
    }, [rawItems, filterByCategory, orderBy, itemsPerPage])

    return paginatedItems
}