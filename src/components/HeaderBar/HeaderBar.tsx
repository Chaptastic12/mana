import React from 'react'

import './HeaderBar.css';

const HeaderBar = () => {
  return (
    <div className='HeaderBar'>
        <div className='HeaderBar__Left'>
            <div>Your Projects</div>
        </div>
        <div className='HeaderBar__Right'>
            <div>All Ticket Search</div>
            <div>User Icon</div>
        </div>
    </div>
  )
}

export default HeaderBar