export const findCorrectArray = ( status: string ) =>{
    let result: string = '';

    switch(status){
        case('Open Items'):
            result = 'openTickets'
            break;
        case('In Progress'):
            result = 'inProgress'
            break;
        case('Quality Check Items'):
            result = 'qualityCheck'
            break;
        case('Finished Items'):
            result = 'finishedTickets'
            break;
        case('Backlog Items'):
            result = 'backlogTickets'
            break;
        default:
            result = ''
            break;
    }
    return result;
}

export const moveTicketToCorrectArray = (source: any, destination: any, project: any) => {
    let movingTicket;
    switch(source.droppableId){
        case('Open Items'):
            movingTicket = project.tickets.openTickets[source.index]
            project.tickets.openTickets.splice(source.index, 1);
            break;
        case('In Progress Items'):
            movingTicket = project.tickets.inProgress[source.index]
            project.tickets.inProgress.splice(source.index, 1);
            break;
        case('Quality Check Items'):
            movingTicket = project.tickets.qualityCheck[source.index]
            project.tickets.qualityCheck.splice(source.index, 1);
            break;
        case('Finished Items'):
            movingTicket = project.tickets.finishedTickets[source.index]
            project.tickets.finishedTickets.splice(source.index, 1);
            break;
        case('Backlog Items'):
            movingTicket = project.tickets.backlogTickets[source.index]
            project.tickets.backlogTickets.splice(source.index, 1);
            break;
        default:
            console.log('break')
            break;
    }

    switch(destination.droppableId){
        case('Open Items'):
            project.tickets.openTickets.splice(destination.index, 0, movingTicket);
            break;
        case('In Progress Items'):
            project.tickets.inProgress.splice(destination.index, 0, movingTicket);
            break;
        case('Quality Check Items'):
            project.tickets.qualityCheck.splice(destination.index, 0, movingTicket);
            break;
        case('Finished Items'):
            project.tickets.finishedTickets.splice(destination.index, 0, movingTicket);
            break;
        case('Backlog Items'):
            project.tickets.backlogTickets.splice(destination.index, 0, movingTicket);
            break;
        default:
            console.log('break')
            break;
    }

    return { project, projRef: movingTicket.projectReference };
}