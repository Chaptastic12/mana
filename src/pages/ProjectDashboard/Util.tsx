import { Ticket } from "../../models/models";

export  const findDestination = ( goingTo: string ) =>{
    let result: string = '';

    switch(goingTo){
        case('Open Items'):
            result = 'Open'
            break;
        case('In Progress Items'):
            result = 'In Progress'
            break;
        case('Quality Check Items'):
            result = 'Quality Check'
            break;
        case('Finished Items'):
            result = 'Finished'
            break;
        case('Backlog Items'):
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
        case('Open Items'):
            array = [ ...openTickets ];
            break;
        case('In Progress Items'):
            array = [ ...progressTickets ] 
            break;
        case('Quality Check Items'):
            array = [ ...qualityCheckTickets ] 
            break;
        case('Finished Items'):
            array = [ ...finishedTickets ] 
            break;
        case('Backlog Items'):
            array = [ ...backlogTickets ] 
            break;
        default:
            array = [ ]
            break;
    }
    return array;
}