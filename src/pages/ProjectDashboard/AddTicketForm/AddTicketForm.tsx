import React, { useState } from 'react'

import { IoIosCloseCircleOutline } from 'react-icons/io'
import ErrorBar from '../../../components/ErrorBar/ErrorBar'
import { ALLPROJECTS, USERS } from '../../../DummyData'
import { Ticket } from '../../../models/models'

import './AddTicketForm.css'

export interface Props {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTicketForm = (props: Props) => {

    const date = new Date();
    const blankUser = {
        id: '', username: '', email: '', isAdmin: false, isGuest: true, isRegUser: false
    }
    const blankComment = {
        id: '',
        comment: '',
        createdDate: '',
        author: blankUser
    }

    const [ formData, setFormData ] = useState<Ticket>({id: '', title: '', description: '', projectReference:'', status: '', ticketOwner: blankUser, ticketCreator: blankUser, comments: [], createdDate: date.toLocaleDateString()});
    const [ error, setError ] = useState('');

    let formInputs = Object.entries(formData).map(([key, value]) => {
        if(key === 'id' || key === 'comments'){ return }
        const adjustedKey = key.replace(/([A-Z])/g, ' $1').trim();
        let disabled = false;
        let element;

        if(key === 'createdDate' || key === 'ticketCreator'){ disabled = true }

        if(key === 'projectReference'){
            let options = [<option key='StatusDefault' value='default'>Choose...</option>];
            for(let x=0; x < ALLPROJECTS.length; x++){
                options.push(<option key={ALLPROJECTS[x].projectShortName} value={ALLPROJECTS[x].projectShortName}>{ ALLPROJECTS[x].projectShortName }</option>)
            }
            element = <select value={formData.projectReference} onChange={(e) => setFormData({...formData, projectReference: e.target.value})}>
                            { options }
                        </select>
        } else if(key === 'status'){
            element = <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                            <option value='default'>Choose...</option>
                            <option value='Open'>Open</option>
                            <option value='In Progress'>In Progress</option>
                            <option value='Quality Check'>Quality Check</option>
                            <option value='Finished'>Finished</option>
                            <option value='Backlog'>Backlog</option>
                        </select>
        } else if(key === 'ticketOwner'){
            element = <div>
                <input list="ticketOwner" name="ticketOwners" id="ticketOwners" value={formData.ticketOwner.username || ''} onChange={(e) => adjustUser(e.target.value, 'ticketOwner')} />
                <datalist id="ticketOwner">
                    {USERS.map(x => { return <option key={x.username} value={x.username} /> })}
                </datalist>
            </div>  
        } else if(key === 'ticketCreator'){
            element = <div>
                <input list="ticketCreator" name="ticketCreators" id="ticketCreators" value={formData.ticketCreator.username || ''} onChange={(e) => adjustUser(e.target.value, 'ticketCreator')} />
                <datalist id="ticketCreator">
                    {USERS.map(x => { return <option key={x.username} value={x.username} /> })}
                </datalist>
            </div>  
        } else if(key === 'title'){
            element = <input type='text' placeholder={adjustedKey} value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value }) }  /> 
        } else if(key === 'description'){
            element = <input type='text' placeholder={adjustedKey} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value }) }  /> 
        } else if(key === 'createdDate'){
            element = <input type='text' placeholder={adjustedKey} value={formData.createdDate} onChange={(e) => setFormData({ ...formData, createdDate: e.target.value }) }  disabled /> 
        }

        return  <div key={key} className='Input'>
                    <label>{adjustedKey}</label><br/>
                    { element }
                </div>
    });

    const adjustUser = (newValue: string, where: string) => {
        let copyState = { ...formData };
        let foundUser = USERS.filter( x => x.username === newValue);
        if(where === 'ticketOwner') {
            copyState.ticketOwner = foundUser[0];
        } else {
            copyState.ticketCreator = foundUser[0];
        }
        setFormData(copyState);
    }

    const fieldsAreValidated = () => {
        setError('');
        if(formData.title.length < 3 || formData.description.length < 3 || formData.projectReference.length < 1 || formData.status.length < 3 || formData.projectReference === 'default' || formData.status === 'default'){
            setError('Please ensure all fields are filled out.');
        } else {
            let copyState = { ...formData }
            let chosenProject = ALLPROJECTS.filter(x => x.projectShortName === formData.projectReference);
            const ticketID = (chosenProject[0].tickets.length + 1).toString();
            const ticketNumber = chosenProject[0].projectShortName + '-' + ticketID;
            copyState.id = ticketID;
            copyState.projectReference = ticketNumber;
            chosenProject[0].tickets.push({ ...copyState,  comments: [] });
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
        { error && <div className='AddTicketForm__Error'><ErrorBar errorMsg={error}/> </div>}
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