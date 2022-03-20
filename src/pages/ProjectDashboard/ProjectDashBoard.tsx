import React, { useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { Ticket } from '../../models/models';
import { findOrigin, findDestination } from './Util';
import { ALLPROJECTS } from '../../DummyData';

import Columns from './Columns/Columns';

const ProjectDashBoard = () => {

    const [ allProjects, setAllProjects ] = useState(ALLPROJECTS);
    const [ chosenProject, setChosenProject ] = useState(ALLPROJECTS[0]);

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        let copyProjectData = { ...chosenProject };

        if(!destination){ return }

        let movingTicketID: string;
        let startingResult, ticketIndex, endResult;

        startingResult = findOrigin(source.droppableId, openTickets, progressTickets, qualityCheckTickets, finishedTickets, backlogTickets);
        movingTicketID = startingResult[source.index].id;
        ticketIndex = copyProjectData.tickets.findIndex( x => x.id === movingTicketID);
        endResult = findDestination(destination.droppableId); 
        copyProjectData.tickets[ticketIndex].status = endResult;
        setChosenProject(copyProjectData);
    }

    const openTickets: Ticket[] = chosenProject.tickets.filter(project => project.status === 'Open');
    const progressTickets: Ticket[] = chosenProject.tickets.filter(project => project.status === 'In Progress');
    const qualityCheckTickets: Ticket[] = chosenProject.tickets.filter(project => project.status === 'Quality Check');
    const finishedTickets: Ticket[] = chosenProject.tickets.filter(project => project.status === 'Finished');
    const backlogTickets: Ticket[] = chosenProject.tickets.filter(project => project.status === 'Backlog');

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <div>
            ProjectDashBoard
            {/* Input / dropdown to search for the project dashboard to load */}

            {/* 
                5 columns for our tasks. Open, In Progress, Quality Check, Finished, Backlog 
                Tickets can be dragged / dropped from column to columns
            */}
            <div style={{display: 'flex'}}>
                <Columns title='Open Tickets' tickets={openTickets}/>
                <Columns title='In Progress Tickets' tickets={progressTickets}/>
                <Columns title='Quality Check Tickets' tickets={qualityCheckTickets}/>
                <Columns title='Finished Tickets' tickets={finishedTickets}/>
                <Columns title='Backlog Tickets' tickets={backlogTickets}/>
            </div>
            {/* Ticket themselves will show: Ticket Title, ticket number, ticket owner, last update */}
        </div>
    </DragDropContext>
  )
}

export default ProjectDashBoard