import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { TICKETS, DUMMY_TICKET } from '../../DummyData';

import './TicketDetails.css'
const TicketDetails = () => {

    const { projectReference} = useParams();
    const [ ticket, setTicket ] = useState(DUMMY_TICKET);

    useEffect(() => {
        const paramTicket = TICKETS.filter(x => x.projectReference === projectReference);
        if(paramTicket[0].id !== '0'){ setTicket(paramTicket[0]) }

    }, [ projectReference ])

    console.log(ticket)

  return (
    <div>TicketDetails</div>
  )
}

export default TicketDetails