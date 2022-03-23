import { useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { Ticket } from '../../models/models';
import { findOrigin, findDestination } from './Util';
import { ALLPROJECTS } from '../../DummyData';
import Columns from './Columns/Columns';
import SearchBar from './SearchBar/SearchBar';

import './ProjectDashBoard.css';

const ProjectDashBoard = () => {

    // const [ allProjects, setAllProjects ] = useState(ALLPROJECTS);
    const [ chosenProject, setChosenProject ] = useState(ALLPROJECTS[0]);

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        let copyProjectData = { ...chosenProject };

        if(!destination){ return }

        let movingTicketID: string;
        let startingResult, ticketIndex;
        let endResult: string;

        if( source.droppableId !== destination.droppableId){
            startingResult = findOrigin(source.droppableId, openTickets, progressTickets, qualityCheckTickets, finishedTickets, backlogTickets);
            movingTicketID = startingResult[source.index].id;
            ticketIndex = copyProjectData.tickets.findIndex( x => x.id === movingTicketID);
            endResult = findDestination(destination.droppableId); 
            copyProjectData.tickets[ticketIndex].status = endResult;
            setChosenProject(copyProjectData);
        } else if(source.droppableId === destination.droppableId) {
            let currentCol = findOrigin(source.droppableId, openTickets, progressTickets, qualityCheckTickets, finishedTickets, backlogTickets);
            if(currentCol.length === 1){
                return;
            }
            let movingTicketIndex = copyProjectData.tickets.findIndex( x => x.id === currentCol[source.index].id);
            let destinationTicketIndex = copyProjectData.tickets.findIndex( x => x.id === currentCol[destination.index].id);
            
            let movingTicket = { ...chosenProject.tickets[movingTicketIndex] };
            let newOrder = []
            for(let i = movingTicketIndex; i > destinationTicketIndex - 1; i--){
                newOrder[i] = copyProjectData.tickets[i - 1];
            }

            newOrder[destinationTicketIndex] = movingTicket;
            endResult = findDestination(destination.droppableId); 
            //let otherTickets = copyProjectData.tickets.filter( x => x.status !== endResult);
            let otherTickets = copyProjectData.tickets.filter( x => x.status !== endResult);
            copyProjectData.tickets = [ ...otherTickets, ...newOrder ];
            console.log(copyProjectData.tickets)
            setChosenProject(copyProjectData)
        }

    }

    const openTickets: Ticket[] = chosenProject.tickets.filter(project => project.status === 'Open');
    const progressTickets: Ticket[] = chosenProject.tickets.filter(project => project.status === 'In Progress');
    const qualityCheckTickets: Ticket[] = chosenProject.tickets.filter(project => project.status === 'Quality Check');
    const finishedTickets: Ticket[] = chosenProject.tickets.filter(project => project.status === 'Finished');
    const backlogTickets: Ticket[] = chosenProject.tickets.filter(project => project.status === 'Backlog');

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <div className='ProjectDashBoard'>
            
            <div className='ProjectDashBoard__Title'> <p> <b>Project:</b> { chosenProject.projectName }</p> </div>

            <div className='ProjectDashBoard_SearchBar'>
                <SearchBar />
            </div>

            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <Columns title='Open Tickets' tickets={openTickets}/>
                <Columns title='In Progress Tickets' tickets={progressTickets}/>
                <Columns title='Quality Check Tickets' tickets={qualityCheckTickets}/>
                <Columns title='Finished Tickets' tickets={finishedTickets}/>
                <Columns title='Backlog Tickets' tickets={backlogTickets}/>
            </div>

        </div>
    </DragDropContext>
  )
}

export default ProjectDashBoard