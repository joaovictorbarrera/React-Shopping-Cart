import React from 'react'

function Notification({note}) {
  return (
    <div className='notification-item'>
        <button className='closing-button'>✕</button>
        {note.text}
    </div>
  )
}

export default Notification