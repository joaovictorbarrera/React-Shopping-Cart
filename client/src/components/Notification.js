import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNotifications, useSetNotifications } from '../contexts/NotificationsProvider'

function Notification({note}) {
    const noteRef = useRef()
    const notifications = useNotifications()
    const setNotifications = useSetNotifications()

    const [width, setWidth] = useState(0)
    const [timer, setTimer] = useState()
    
    useEffect(() => {
      noteRef.current.onanimationend = () => {
        noteRef.current.classList.remove("slide-left")
        noteRef.current.onanimationend = undefined
      }

      noteRef.current.classList.add("slide-left")
    }, [noteRef])

    const removeNotification = useCallback(() => {
        noteRef.current.onanimationend = () => {
            setNotifications([...notifications.filter(listNote => listNote.id !== note.id)])
        }
        noteRef.current.classList.add("slide-right")
    }, [noteRef, note, notifications, setNotifications])

    useLayoutEffect(() => {
        if (width >= noteRef.current.clientWidth) {
            clearInterval(timer)
            removeNotification()
        }
    }, [noteRef, width, timer, removeNotification])

    useEffect(() => {
        setTimer(setInterval(() => {
            setWidth(oldWidth => oldWidth + 1)
        }, 10))
    }, [])
    
    return (
        <div ref={noteRef} className={`notification-item ${note.type === "SUCCESS" ? "success" : "error"}`}>
            <button onClick={removeNotification} className='closing-button'>✕</button>
            <strong>{note.text}</strong>
            <div className='notification-timer' style={{"width":width}}></div>
        </div>
    )
}

export default Notification