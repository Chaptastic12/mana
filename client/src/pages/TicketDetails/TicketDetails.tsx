import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { BsPlusSquare } from 'react-icons/bs'

import { Comment, Ticket, ProjectContextInterface } from '../../models/models';
import { ProjectTicketContext } from '../../Context/ProjectTicket-Context';

import CommentDiv from '../../components/Comment/Comment';
import EditableInput from '../../components/EditableInput/EditableInput';
import { TICKETS, DUMMY_TICKET, BLANKUSER, USERS } from '../../DummyData';

import './TicketDetails.css'
import ErrorBar from '../../components/ErrorBar/ErrorBar';
import DataListEdit from '../../components/UI Elements/DataList/DataListEdit';
const TicketDetails = () => {

    const { projectReference } = useParams();
    const [ ticket, setTicket ] = useState(DUMMY_TICKET);
    const [ commentText, setCommentText ] = useState('');
    const [ refresh, setRefresh ] = useState(false);
    const [ error, setError ] = useState('');
    const { getChosenTicket } = useContext(ProjectTicketContext) as ProjectContextInterface;

    useEffect(() => {
        const getTicket = async () => {
            const ref: string = projectReference || '';
            const response = await getChosenTicket(ref);
            setTicket(response.data);
        }
       getTicket();

        // const paramTicket: Ticket[] = TICKETS.filter(x => x.projectReference === projectReference);
        // if(paramTicket[0].id !== '0'){ setTicket(paramTicket[0]) }

    }, [ projectReference, refresh ])

    if (!ticket){
        return <div>ERROR: UNABLE TO GET TICKET FROM SERVER</div>
    }

    const ticketComments = ticket.comments.map( x => { return <CommentDiv key={x.id}comment={x} /> } );

    //Will eventually need to be reworked once we are on a server
    const addCommentToTicket = () => {
        const date = new Date();
        let payload: Comment = {
            id: (Math.random() * Math.random() * 100 ).toString(),
            comment: commentText,
            createdDate: date.toLocaleDateString(),
            author: BLANKUSER
        }

        //Update our comments with the new payload
        const length = ticket.comments.length;
        ticket.comments[length] = payload;

        //Update our ticket in the general Array
        const ticketIndex = TICKETS.findIndex( x => x.projectReference === projectReference);
        TICKETS[ticketIndex] = ticket;
        setCommentText('')
        setRefresh(prevState => !prevState)
    }

    const editTicketInputField = (newValue: string, field: string) => {
        setError('');

        if(newValue.length === 0){ 
            setError('Error: Field cannot be empty');
            return;
        }

        //Update our new value
        if(field === 'title'){ ticket.title = newValue }
        if(field === 'description'){ ticket.description = newValue }
        if(field === 'status'){ ticket.status = newValue }
        if(field === 'ownerUsername'){
            const newUser = USERS.filter(x => x.username === newValue);
            ticket.ticketOwner = newUser[0];
        }
        //Save our updated ticket
        const ticketIndex = TICKETS.findIndex( x => x.projectReference === projectReference);
        TICKETS[ticketIndex] = ticket;
        setRefresh(prevState => !prevState)
    }
    
    const status = [ { val: 'Open' }, { val: 'In Progress' }, {val: 'Quality Check' }, { val: 'Finished' }, { val: 'Backlog' } ]

  return (
    <div className='TicketDetails'>
            <div className='TicketDetails__Header'>
                { error && <div className='TicketDetails__Error'><ErrorBar errorMsg={error} /></div> }
                <span className='bold'>[{ ticket.projectReference }]</span> <EditableInput type='input' hasLabel={false} text={ticket.title} field='title' editTicketField={(newValue: string, field: string) => editTicketInputField(newValue, field)}/>
                <hr />
            </div>
            <div className='TicketDetails__Container'>
                <div className='TicketDetails__Left'>
                    <div className='TicketDetails__Ticket'>
                        <div className='TicketDetails_Description'>
                            <EditableInput type='textarea' hasLabel={true} label='Description' text={ticket.description} field='description' editTicketField={(newValue: string, field: string) => editTicketInputField(newValue, field)} />
                        </div>
                        <div className='TicketDetails_Comments'>
                            <div style={{paddingBottom: '5px'}}><label>Comments</label></div>
                            { ticketComments.length !== 0 ? ticketComments : <div className='TicketDetails_NoComments'>No Comments / Changes for this ticket</div> }
                            <textarea placeholder='Enter Comment' value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                            <div className='TicketDetails_CommentsButton'>
                                <button onClick={() => addCommentToTicket()}> <BsPlusSquare /> Comment</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='TicketDetails__Right'>
                    <div>Ticket Information</div>
                    <DataListEdit title='Status' value={ticket.status} setValue={(val: string) => editTicketInputField(val, 'status')} id='status' listName='ticketStatus' data={status} name='status' placeholder={'Pick a Status'}/>
                    <DataListEdit title='Ticket Owner' value={ticket.ticketOwner.username} setValue={(val: string) => editTicketInputField(val, 'ownerUsername')} id='ownerUsername' listName='ticketOwnerUsername' data={USERS} name='userName' placeholder={'Pick a User'}/>
                </div>
            </div>
    </div>
  )
}

export default TicketDetails