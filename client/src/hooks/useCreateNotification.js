import { useCallback } from "react"
import { useSetNotifications } from "../contexts/NotificationsProvider"

export default function useCreateNotification() {
  const setNotifications = useSetNotifications()
  return (useCallback((noteSkeleton) => {
    setNotifications(oldNotifications => {
      const newNotification = {
          id: JSON.stringify(Date.now()),
          ...noteSkeleton
      }

      return noteSkeleton.clean ? 
      [newNotification] : 
      [newNotification, ...oldNotifications]
    })
  }, [setNotifications]))
}