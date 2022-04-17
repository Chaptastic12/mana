import React from 'react'
import { Ticket } from '../../../models/models'
import { Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';

import './TicketCard.css';

interface Props {
    ticketData: Ticket,
    index: number
}

const TicketCard = ( { index, ticketData } : Props) => {
  const navigate = useNavigate();

  return (
    <Draggable draggableId={ticketData.id.toString()} index={index}>
    {
        (provided, snapshot) => (
            <div className='TicketCard' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} onClick={() => navigate('/ticket/' + ticketData.projectReference)}>
                <p> <em>{ ticketData.projectReference } </em> </p>
                <b>{ ticketData.title }</b>
                <p>{ ticketData.ticketOwner.username }</p>
                <p><small>Updated: { ticketData.createdDate }</small></p>
            </div>
        )
    }
    </Draggable>
  )
}

export default TicketCard