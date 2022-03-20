import { Ticket } from "../../models/models";

export  const findDestination = ( goingTo: string ) =>{
    let result: string = '';

    switch(goingTo){
        case('Open Tickets'):
            result = 'Open'
            break;
        case('In Progress Tickets'):
            result = 'In Progress'
            break;
        case('Quality Check Tickets'):
            result = 'Quality Check'
            break;
        case('Finished Tickets'):
            result = 'Finished'
            break;
        case('Backlog Tickets'):
            result = 'Backlog'
            break;
        default:
            result = ''
            break;
    }
    return result;
}

export const findOrigin = ( goingTo: string, openTickets: Ticket[], progressTickets: Ticket[], qualityCheckTickets: Ticket[], finishedTickets: Ticket[], backlogTickets: Ticket[] ) =>{
    let array: Ticket[];

    switch(goingTo){
        case('Open Tickets'):
            array = [ ...openTickets ];
            break;
        case('In Progress Tickets'):
            array = [ ...progressTickets ] 
            break;
        case('Quality Check Tickets'):
            array = [ ...qualityCheckTickets ] 
            break;
        case('Finished Tickets'):
            array = [ ...finishedTickets ] 
            break;
        case('Backlog Tickets'):
            array = [ ...backlogTickets ] 
            break;
        default:
            array = [ ]
            break;
    }
    return array;
}