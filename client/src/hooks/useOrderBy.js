import { useCallback } from "react"
import useCreateNotification from "./useCreateNotification"
import useLocalStorage from "./useLocalStorage"

export default function useOrderBy(defaultValue) {
  const createNotification = useCreateNotification()
  const [selectedOrder, setSelectedOrder] = useLocalStorage("selectedOrder", defaultValue)

  const handleOrderChange = useCallback((event) => {
    setSelectedOrder(event.target.value)
    createNotification(
      {
        "text":`Successfully updated order option to "${event.target.value}".`,
        "type":"WARNING",
        "duration": 2,
        "clean":true
      }
    )
  }, [setSelectedOrder, createNotification])

  return [selectedOrder, handleOrderChange]
}