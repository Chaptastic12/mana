import React from 'react'

import './SearchBar.css';

const SearchBar = () => {
  return (
    <div className='SearchBar'>
        <div className='SearchBar__Input'>
            <input type='text' placeholder='Search...'></input>
            <button>Search</button>
        </div>
        <div className='SearchBar_Buttons'>
            <div className='Buttons'>
            <button>Add Ticket</button>

            </div>
        </div>
    </div>
  )
}

export default SearchBar