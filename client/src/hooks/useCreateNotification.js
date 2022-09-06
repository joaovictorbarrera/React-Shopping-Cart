import { useCallback } from "react"
import { useSetNotifications } from "../contexts/NotificationsProvider"

export default function useCreateNotification() {
  const setNotifications = useSetNotifications()
  return (useCallback((text, type) => {
    setNotifications( oldNotifications => 
    [
      {
          id: JSON.stringify(Date.now()),
          text, type 
      }, 
      ...oldNotifications
    ]
    )
  }, [setNotifications]))
}