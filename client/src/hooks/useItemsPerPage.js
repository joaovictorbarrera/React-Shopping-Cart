import { useCallback } from "react"
import useCreateNotification from "./useCreateNotification"
import useLocalStorage from "./useLocalStorage"

export default function useItemsPerPage(defaultValue) {
    const createNotification = useCreateNotification()
    const [itemsPerPage, setItemsPerPage] = useLocalStorage("itemsPerPage", defaultValue)

    const handleItemsPerPageChange = useCallback(
        (event) => {
          setItemsPerPage(event.target.value)
          createNotification(
            {
              "text":`Successfully updated to ${event.target.value} items per page.`,
              "type":"WARNING",
              "duration": 2,
              "clean":true
            }
          )
        },[setItemsPerPage, createNotification]
      )

    return [itemsPerPage, handleItemsPerPageChange]
}