import React, { useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

const ProjectDashBoard = () => {

    const [ allProjects, setAllPronects ] = useState([]);

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

    }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <div>
            ProjectDashBoard
            {/* Input / dropdown to search for the project dashboard to load */}

            {/* 
                5 columns for our tasks. Open, In Progress, Quality Check, Finished, Backlog 
                Tickets can be dragged / dropped from column to columns
            */}

            {/* Ticket themselves will show: Ticket Title, ticket number, ticket owner, last update */}
        </div>
    </DragDropContext>
  )
}

export default ProjectDashBoard