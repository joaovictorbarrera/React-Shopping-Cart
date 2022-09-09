import React, { useCallback } from 'react'
import "../../App.css"

function Pagination({currentPage, setCurrentPage, amountOfPages}) {
    const scrollTop = useCallback(() => {
        window.scrollTo({
            top: document.querySelector(".items-box").getBoundingClientRect().top,
            behavior: 'smooth'
        });
    }, [])

    const handleGoBack = useCallback(() => {
        if (currentPage === 1) return
        setCurrentPage(curr => String(Number(curr) - 1))
        scrollTop()
    }, [currentPage, setCurrentPage, scrollTop])

    const handleGoForward = useCallback(() => {
        if (currentPage >= amountOfPages) return
        setCurrentPage(curr => String(Number(curr) + 1))
        scrollTop()
    }, [currentPage, amountOfPages, setCurrentPage, scrollTop])

    return (
        <div className='pagination-wrapper'>
            <button className='pagination-button left' onClick={handleGoBack}>
                {'<'}
            </button>
            <div className='pagination-text'>
                Page {currentPage} of {amountOfPages}
            </div>
            <button className='pagination-button right' onClick={handleGoForward}>  
                {'>'}
            </button>
        </div>
    )
}

export default Pagination