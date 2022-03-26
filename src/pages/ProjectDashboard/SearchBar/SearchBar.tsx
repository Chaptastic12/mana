import React from 'react'

import { BsPlusSquare } from 'react-icons/bs'

import './SearchBar.css';

export interface Props {
  openModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar = (props: Props) => {
  return (
    <div className='SearchBar'>
        <div className='SearchBar__Input'>
            <input type='text' placeholder='Search...'></input>
            <button>Search</button>
        </div>
        <div className='SearchBar_Buttons'>
            <div className='Buttons'>
            <button onClick={() => props.openModal(true)}> <BsPlusSquare /> Ticket</button>

            </div>
        </div>
    </div>
  )
}

export default SearchBar