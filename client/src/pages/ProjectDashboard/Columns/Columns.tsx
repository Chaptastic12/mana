import React from 'react';
import { Ticket } from '../../../models/models';
import TicketCard from '../TicketCard/TicketCard';
import { Droppable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';

import './Columns.css'

interface Props {
    title: String,
    tickets: Ticket[]
}

const Columns = ( { title, tickets } : Props ) => {
  return (
    <Droppable droppableId={title.toString()}  > 
    {
        (provided, snapshot) => (
            <div className='Columns' ref={provided.innerRef} { ...provided.droppableProps } >
                <h2>{ title }</h2>
                <hr />
                <div className='Columns__Tickets'>
                    { tickets.map((ticket, index) => <TicketCard key={uuid()} index={index} ticketData={ticket} />) }
                    {provided.placeholder}
                </div>
            </div>
        )
    }
    </Droppable>
  )
}

export default Columns