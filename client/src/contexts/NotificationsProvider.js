import { createContext, useContext, useState } from "react"
import Notification from "../components/Notification"

const NotificationsContext = createContext()
const SetNotificationsContext = createContext()

export function useNotifications() {
    return useContext(NotificationsContext)
}

export function useSetNotifications() {
    return useContext(SetNotificationsContext)
}

export default function NotificationsProvider({children}) {
    const [notifications, setNotifications] = useState([
        // {
        //     "id": JSON.stringify(Date.now()),
        //     "text":"<item> added to cart successfully.",
        //     "type":"SUCCESS"
        // },
    ])

    return (
        <NotificationsContext.Provider value={notifications}>
            <SetNotificationsContext.Provider value={setNotifications}>
                <div className="notifications-wrapper">
                    {notifications.map(note => {
                        return <Notification key={note.id} note={note}/>
                    })}
                </div>
                {children}
            </SetNotificationsContext.Provider> 
        </NotificationsContext.Provider>
    )
}