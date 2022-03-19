import React from 'react';
import { Ticket } from '../../../models/models';
import TicketCard from '../TicketCard/TicketCard';

interface Props {
    title: String,
    tickets: Ticket[]
}

const Columns = ( { title, tickets } : Props ) => {
  return (
    <div>
        <h1>{ title }</h1>
        { tickets.map((ticket, index) => <TicketCard index={index} ticketData={ticket} />) }
    </div>
  )
}

export default Columns