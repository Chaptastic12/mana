import React from 'react';
import { Ticket } from '../../../models/models';
import TicketCard from '../TicketCard/TicketCard';
import { Droppable } from 'react-beautiful-dnd';
import './Columns.css'

interface Props {
    title: String,
    tickets: Ticket[]
}

const Columns = ( { title, tickets } : Props ) => {
  return (
    <Droppable droppableId={title.toString()} > 
    {
        (provided, snapshot) => (
            <div className='Columns' ref={provided.innerRef} { ...provided.droppableProps } >
                <h2>{ title }</h2>
                <hr />
                { tickets.map((ticket, index) => <TicketCard index={index} ticketData={ticket} />) }
                {provided.placeholder}
            </div>
        )
    }
    </Droppable>
  )
}

export default Columns