import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useSetNotifications } from '../contexts/NotificationsProvider'
import { useSetShoppingCartItems } from '../contexts/ShoppingCartProvider'
import useInterval from '../hooks/useInterval'

function Notification({note}) {
    /*
    text -> text on notification
    type -> color of notification
    undo -> item, index to undo to
    clean -> clean all other notifications
    duration -> amount of seconds it will stay on screen
    */
    const noteRef = useRef()
    const setNotifications = useSetNotifications()
    const setCartItems = useSetShoppingCartItems()

    const [width, setWidth] = useState(0)
    const [widthIncrementor, setWidthIncrementor] = useState(1)
    const [delay, setDelay] = useState(null)
    // console.log(widthIncrementor)
    // console.log(delay)

    // grow progress bar
    useInterval(
        useCallback(
            () => setWidth(oldWidth => oldWidth + widthIncrementor), 
            [setWidth, widthIncrementor]
        ), 
    delay)

    // sliding in animation
    useEffect(() => {
        console.log(note)
        noteRef.current.onanimationend = () => {
            noteRef.current.classList.remove("slide-in")
            noteRef.current.onanimationend = undefined
        }

        noteRef.current.classList.add("slide-in")
    }, [note])

    const handleStartTimer = useCallback(() => {
        // console.log(`width: ${(noteRef.current.clientWidth) - 10}`)
        let delayCalc = note.duration ? (note.duration * 1000 / (noteRef.current.clientWidth - 10)) : null
        let widthInc = 1
        console.log(delayCalc)
        while (delayCalc < 10) {
            widthInc *= 2
            delayCalc *= 2
        }
        console.log(widthInc)
        console.log(delayCalc)
        setWidthIncrementor(widthInc)
        setDelay(delayCalc)
    }, [setDelay, note.duration])

    const handlePauseTimer = useCallback(() => {
        setDelay(null)
    }, [setDelay])

    // filter off notification and sliding right animation
    const handleCloseNotification = useCallback(() => {
        handlePauseTimer()
        noteRef.current.onanimationend = () => {
            setNotifications(oldNotifications => [...oldNotifications.filter(listNote => listNote.id !== note.id)])
        }
        noteRef.current.classList.add("slide-out")
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

    const typeStyles = useMemo(() => {
        return {"SUCCESS":"success", "ERROR":"error", "WARNING": "warning", "REMOVAL":"error"}
    }, [])

    const handleUndo = useCallback(() => {
        setCartItems(note.undo.cartSnapshot)
        handleCloseNotification()
    }, [note.undo, setCartItems, handleCloseNotification])

    return (
        <div ref={noteRef} className={`notification-item ${typeStyles[note.type]}`}
        onMouseOver={handlePauseTimer} onMouseLeave={handleStartTimer}>
            <button onClick={handleCloseNotification} className='closing-button'>✕</button>
            <strong>{note.text}</strong>
            {note.undo ? <button onClick={handleUndo} className='undo-btn'>Undo?</button> : null}
            <div className='notification-timer' style={{"width":`${width}px`}}></div>
        </div>
    )
}

export default Notification