import React from 'react'

import { BsPlusSquare } from 'react-icons/bs'
import { IoSearchOutline } from 'react-icons/io5'
import Button from '../../../components/UI Elements/Button/Button';

import './SearchBar.css';

export interface Props {
  openModal: React.Dispatch<React.SetStateAction<boolean>>;
  searchHandler: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = (props: Props) => {
  return (
    <div className='SearchBar'>
        <div className='SearchBar__Input'>
            <input type='text' placeholder='Search Current Project Tickets' onChange={(e) => props.searchHandler(e.target.value) }></input>
            <button><IoSearchOutline /></button>
        </div>
        <div className='SearchBar_Buttons'>
            <div className='Buttons'>
              <Button function={() => props.openModal(true)}> <BsPlusSquare /> Ticket</Button>
            </div>
        </div>
    </div>
  )
}

export default SearchBar