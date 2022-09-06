import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useSetNotifications } from '../contexts/NotificationsProvider'
import useInterval from '../hooks/useInterval'

function Notification({note}) {
    const noteRef = useRef()
    const setNotifications = useSetNotifications()

    const [width, setWidth] = useState(0)
    const [delay, setDelay] = useState(null)

    // grow progress bar
    useInterval(
        useCallback(
            () => setWidth(oldWidth => oldWidth + 1), 
            [setWidth]
        ), 
    delay)

    // sliding left animation
    useEffect(() => {
        // console.log("slided left")
        noteRef.current.onanimationend = () => {
            noteRef.current.classList.remove("slide-left")
            noteRef.current.onanimationend = undefined
        }

        noteRef.current.classList.add("slide-left")
    }, [])

    const handleStartTimer = useCallback(() => {
        console.log("timer STARTED")
        setDelay(10)
    }, [setDelay])

    const handlePauseTimer = useCallback(() => {
        console.log("timer PAUSED")
        setDelay(null)
    }, [setDelay])

    // filter off notification and sliding right animation
    const handleCloseNotification = useCallback(() => {
        console.log("slided right / removed notification")
        handlePauseTimer()
        noteRef.current.onanimationend = () => {
            setNotifications(oldNotifications => [...oldNotifications.filter(listNote => listNote.id !== note.id)])
        }
        noteRef.current.classList.add("slide-right")
    }, [note.id, setNotifications, handlePauseTimer])

    // notification is due
    useLayoutEffect(() => {
        if (width >= noteRef.current.clientWidth - 10) {
            handleCloseNotification()
        }
    }, [width, handleCloseNotification, handlePauseTimer])

    // start timer when notification is created
    useEffect(() => {
        handleStartTimer()

        return handlePauseTimer
    }, [handleStartTimer, handlePauseTimer])
    
    return (
        <div ref={noteRef} className={`notification-item ${note.type === "SUCCESS" ? "success" : "error"}`}
        onMouseOver={handlePauseTimer} onMouseLeave={handleStartTimer}>
            <button onClick={handleCloseNotification} className='closing-button'>✕</button>
            <strong>{note.text}</strong>
            <div className='notification-timer' style={{"width":`${width}px`}}></div>
        </div>
    )
}

export default Notification