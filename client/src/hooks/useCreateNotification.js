import { useCallback } from "react"
import { useNotifications, useSetNotifications } from "../contexts/NotificationsProvider"

export default function useCreateNotification() {
  const notifications = useNotifications()
  const setNotifications = useSetNotifications()
  return (useCallback((text, type) => {
    setNotifications(
    [
      {
          id: JSON.stringify(Date.now()),
          text, type 
      }, 
      ...notifications
    ]
    )
  }, [notifications, setNotifications]))
}