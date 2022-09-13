import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import fixTwoDecimalPlaces from '../services/fixTwoDecimalPlaces'
import truncate from '../services/truncate'

function Modal({item, open, onClose}) {
    const DESCRIPTION_MAX_LENGTH = 230
    const longDescription = item.description.length > DESCRIPTION_MAX_LENGTH
    const [readMoreActive, setReadMoreActive] = useState()
    const modalRef = useRef()

    useEffect(() => {
        if (open) setReadMoreActive(longDescription)
    }, [open, longDescription])

    useEffect(() => {
        if (open) {
            modalRef.current.classList.add("fade-in")
            modalRef.current.onanimationend = () => {
                modalRef.current.classList.remove("fade-in")
                modalRef.current.onanimationend = undefined
            }
        } 
        // else {
        //     modalRef.current.classList.add("fade-out")
        //     modalRef.current.onanimationend = () => {
        //         modalRef.current.onanimationend = undefined
        //     }
        // }
    }, [open])

    function handleClose() {
        modalRef.current.classList.add("fade-out")
        modalRef.current.onanimationend = () => {
            onClose()
        }
    }

    const description = readMoreActive ? truncate(item.description, DESCRIPTION_MAX_LENGTH) : item.description
    const readMoreButton = readMoreActive ? <button className='readmore-btn' onClick={() => setReadMoreActive(false)}>read more</button> : null

    if (!open) return null
    return (
        ReactDOM.createPortal(
        <div ref={modalRef}>
            <div onClick={handleClose} className='overlay'></div>
            <div className='modal'>
                <div className='modal-wrapper'>
                    <button onClick={handleClose} className='closing-button'>X</button>
                    <section className='modal-item-picture'>
                        <img alt={item.title} src={item.thumbnail} />
                    </section>
                    <section className='modal-item-info'>
                        <header>
                            <h1 className='modal-item-title'>{item.title}</h1>
                            <p className='modal-item-category'>{item.category}</p>
                        </header>
                        <p className='modal-item-description'>{description}{readMoreButton}</p>
                        <div>
                            <hr />
                            <span className='modal-item-price'>{`$${fixTwoDecimalPlaces(item.price)}`}</span>
                        </div>
                    </section>
                </div> 
            </div>
        </div>, document.getElementById("modal")
        )
    )
}

export default Modal