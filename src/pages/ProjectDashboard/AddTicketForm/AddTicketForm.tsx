import React, { useState } from 'react'

import { IoIosCloseCircleOutline } from 'react-icons/io'

import './AddTicketForm.css'

export interface Props {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTicketForm = (props: Props) => {

    const date = new Date;

    const [ formData, setFormData ] = useState({title: '', description: '', projectReference:'', status: '', ticketOwner: '', ticetCreator: '', createdDate: date.toLocaleDateString()});

    let formInputs = Object.entries(formData).map(([key, value]) => {
        const adjustedKey = key.replace(/([A-Z])/g, ' $1').trim();
        let disabled = false;
        if(key === 'createdDate'){ disabled = true }
        return  <div className='Input'>
                    <label>{adjustedKey}</label><br/>
                    <input type='text' placeholder={adjustedKey} value={formData[key as keyof typeof formData]} onChange={(e) => setFormData({ ...formData, [key]: e.target.value }) } disabled={disabled} />
                </div>
    });

  return (
    <div className='AddTicketForm'>
        <div className='AddTicketForm__Header'>
            <div className='Title'><h1>Add Ticket</h1></div>
            <div className='Close' onClick={() => props.closeModal(false) }> <IoIosCloseCircleOutline /> </div>
            <hr style={{ width: '95%' }}/>
        </div>
        <div className='AddTicketForm__Form'>
            { formInputs }
        </div>
    </div>
  )
}

export default AddTicketForm