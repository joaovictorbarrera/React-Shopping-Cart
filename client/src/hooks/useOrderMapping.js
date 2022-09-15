import { useMemo } from "react"

export default function useOrderMapping() {
    const orders = useMemo(() => (
        {
            "No Order": (items) => items,
            "Alphabetic": (items) => [...items].sort((a, b) => a.title >= b.title ? 1 : -1),
            "Alphabetic Reverse": (items) => [...items].sort((a, b) => a.title < b.title ? 1 : -1),
            "Price Ascending": (items) => [...items].sort((a, b) => a.price >= b.price ? 1 : -1),
            "Price Descending": (items) => [...items].sort((a, b) => a.price < b.price ? 1 : -1)
        }
    ), [])

    return orders
}