import React from 'react'

import { IoIosCloseCircleOutline } from 'react-icons/io'

import './AddTicketForm.css'

export interface Props {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTicketForm = (props: Props) => {
  return (
    <div className='AddTicketForm'>
        <div className='AddTicketForm__Header'>
            <div className='Title'><h1>Add Ticket</h1></div>
            <div className='Close' onClick={() => props.closeModal(false) }> <IoIosCloseCircleOutline /> </div>
        </div>
    </div>
  )
}

export default AddTicketForm