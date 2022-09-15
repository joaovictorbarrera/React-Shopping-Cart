import { useCallback } from "react"
import useCreateNotification from "./useCreateNotification"
import useLocalStorage from "./useLocalStorage"

export default function useFilterByCategory(defaultValue) {
    const createNotification = useCreateNotification()
    const [selectedCategory, setSelectedCategory] = useLocalStorage("selectedCategory", defaultValue)

    const handleCategoryChange = useCallback((event) => {
        setSelectedCategory(event.target.value)
        createNotification(
          {
            "text":`Successfully updated filter option to "${event.target.value}".`,
            "type":"WARNING",
            "duration": 2,
            "clean":true
          }
        )
    }, [setSelectedCategory, createNotification])
    
    return [selectedCategory, handleCategoryChange]
}