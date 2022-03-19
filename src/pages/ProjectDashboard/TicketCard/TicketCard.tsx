import React from 'react'
import { Ticket } from '../../../models/models'

interface Props {
    ticketData: Ticket,
    index: number
}

const TicketCard = ( { index, ticketData } : Props) => {
  return (
    <div>TicketCard</div>
  )
}

export default TicketCard