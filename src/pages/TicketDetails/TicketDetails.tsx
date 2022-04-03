import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BsPlusSquare } from 'react-icons/bs'

import { Comment, Ticket } from '../../models/models';

import CommentDiv from '../../components/Comment/Comment';
import { TICKETS, DUMMY_TICKET, BLANKUSER } from '../../DummyData';

import './TicketDetails.css'
const TicketDetails = () => {

    const { projectReference} = useParams();
    const [ ticket, setTicket ] = useState(DUMMY_TICKET);
    const [ commentText, setCommentText ] = useState('');
    const [ refresh, setRefresh ] = useState(false);

    useEffect(() => {
        const paramTicket: Ticket[] = TICKETS.filter(x => x.projectReference === projectReference);
        if(paramTicket[0].id !== '0'){ setTicket(paramTicket[0]) }

    }, [ projectReference, refresh ])

    const ticketComments = ticket.comments.map( x => { return <CommentDiv comment={x} /> } );

    //Will eventually need to be reworked once we are on a server
    const addCommentToTicket = () => {
        const date = new Date();
        let payload: Comment = {
            id: '1',
            comment: commentText,
            createdDate: date.toLocaleDateString(),
            author: BLANKUSER
        }

        const length = ticket.comments.length;
        ticket.comments[length] = payload;

        const ticketIndex = TICKETS.findIndex( x => x.projectReference === projectReference);
        TICKETS[ticketIndex] = ticket;
        setCommentText('')
        setRefresh(prevState => !prevState)
    }

  return (
    <div className='TicketDetails'>
        <div className='TicketDetails__Header'>
            <span className='bold'>[{ ticket.projectReference }]</span> <span> { ticket.title} </span>
            <hr />
        </div>
        <div className='TicketDetails__Ticket'>
            <div className='TicketDetails_Info'>

            </div>
            <div className='TicketDetails_Comments'>
                { ticketComments.length !== 0 ? ticketComments : <div className='TicketDetails_NoComments'>No Comments / Changes for this ticket</div> }
                <textarea placeholder='Enter Comment' value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                <div className='TicketDetails_CommentsButton'>
                    <button onClick={() => addCommentToTicket()}> <BsPlusSquare /> Comment</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TicketDetails