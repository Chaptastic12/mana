import React, { useState } from 'react'

import { IoIosCloseCircleOutline } from 'react-icons/io'
import { ALLPROJECTS } from '../../../DummyData'

import './AddTicketForm.css'

export interface Props {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTicketForm = (props: Props) => {

    const date = new Date();

    const [ formData, setFormData ] = useState({title: '', description: '', projectReference:'', status: '', ticketOwner: 'Chaps', ticketCreator: 'Chaps', createdDate: date.toLocaleDateString()});
    const [ error, setError ] = useState('');

    let formInputs = Object.entries(formData).map(([key, value]) => {
        const adjustedKey = key.replace(/([A-Z])/g, ' $1').trim();
        let disabled = false;
        let element;
        if(key === 'createdDate' || key === 'ticketCreator'){ disabled = true }

        if(key === 'projectReference'){
            let options = [];
            for(let x=0; x < ALLPROJECTS.length; x++){
                options.push(<option value={ALLPROJECTS[x].projectShortName}>{ ALLPROJECTS[x].projectShortName }</option>)
            }
            element = <select value={formData.projectReference} onChange={(e) => setFormData({...formData, projectReference: e.target.value})}>
                            { options }
                        </select>
        } else if(key === 'status'){
            element = <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                            <option value='Open'>Open</option>
                            <option value='In Progress'>In Progress</option>
                            <option value='Quality Check'>Quality Check</option>
                            <option value='Finished'>Finished</option>
                            <option value='Backlog'>Backlog</option>
                        </select>
        } else {
            element = <input type='text' placeholder={adjustedKey} value={formData[key as keyof typeof formData]} onChange={(e) => setFormData({ ...formData, [key]: e.target.value }) } disabled={disabled} />
        }

        return  <div key={key} className='Input'>
                    <label>{adjustedKey}</label><br/>
                    { element }
                </div>
    });

    const fieldsAreValidated = () => {
        setError('');
        if(formData.title.length < 3 || formData.description.length < 3 || formData.projectReference.length < 1 || formData.status.length < 3){
            setError('Please ensure all fields are filled out.')
        } else {
            console.log('Fields validated.');
            props.closeModal(false);
        }
    }

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
        <div className='AddTicketForm__Button'>
            <button onClick={() => fieldsAreValidated()}>Submit</button>
            <button onClick={() => props.closeModal(false)}>Close</button>
        </div>
    </div>
  )
}

export default AddTicketForm