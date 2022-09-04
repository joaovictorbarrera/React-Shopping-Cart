import React from 'react'
import '../App.css';

function Footer({isLoading}) {
    if (isLoading) return <></>
    return (
        <footer>
            <hr />
            <p>Made with ❤️ | @2022 - joaovictorbarrera</p>
        </footer>
    )
}

export default Footer