import { useState, useEffect, useContext } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useParams } from 'react-router-dom';

import { Ticket, ProjectContextInterface } from '../../models/models';
import { findOrigin, findDestination, moveArrayItemToNewIndex } from './Util';
import { DUMMY_TICKET } from '../../DummyData';
import { ProjectTicketContext } from '../../Context/ProjectTicket-Context';
import Columns from './Columns/Columns';
import SearchBar from './SearchBar/SearchBar';

import './ProjectDashBoard.css';
import Modal from '../../components/Modal/Modal';
import AddTicketForm from './AddTicketForm/AddTicketForm';

const EMPTY_PROJECT = { 
    id: '0',
    tickets: [DUMMY_TICKET],
    projectReference: '',
    projectName: '',
    createdDate: ''
}
const ProjectDashBoard = () => {

    const [ chosenProject, setChosenProject ] = useState(EMPTY_PROJECT);
    const [ showAddTicket, setShowAddTicket ] = useState<boolean>(false);
    const [ refresh, setRefresh ] = useState<boolean>(false);
    const [ ticketSearch, setTicketSearch ] = useState<string>('');
    const { projectReference } = useParams();
    const { getChosenproject, updateTicketStatus } = useContext(ProjectTicketContext) as ProjectContextInterface

    useEffect(() => {
        const getProject = async () =>{
            const ref: string = projectReference || '';
            const response = await getChosenproject(ref);
            setChosenProject(response.data);
        }
        getProject();
    //eslint-disable-next-line
    }, [projectReference, refresh]);

    if (!chosenProject){
        return <div>ERROR GETTING PROJECT FROM SERVER</div>
    }

    const onDragEnd = async (result: DropResult) => {
        const { source, destination } = result;
        let copyProjectData = { ...chosenProject };

        if(!destination){ return }

        // let movingTicketID: string;
        // let startingResult, ticketIndex;
        // let endResult: string;

        //Get our data for our API call
        const movingTicket = findOrigin(source.droppableId, openTickets, progressTickets, qualityCheckTickets, finishedTickets, backlogTickets)[source.index];
        const movingTicketProjReference = movingTicket.projectReference;
        const movingTicketId = movingTicket._id;
        const startStatus = findOrigin(source.droppableId, openTickets, progressTickets, qualityCheckTickets, finishedTickets, backlogTickets)[source.index].status;
        const startIndex = chosenProject.tickets.findIndex(x => x.projectReference === movingTicketProjReference);
        const endingStatus = findDestination(destination.droppableId);
        const endIndex = destination.index;
        //In order to find out the ending index, we need to find the index of the ticket with the same status that is 1 index before
        // where the moving ticket is going to be
        // let recordProjRef: string = '';
        // let endIndex: number = destination.index;
        

        // if(source.droppableId === destination.droppableId){
        //     endIndex = destination.index
        // } else {
        //     const recordOfEndTypeLast = chosenProject.tickets.filter(x => x.status === endingStatus);
        //     console.log(recordOfEndTypeLast)
        //     if(recordOfEndTypeLast[destination.index - 1]) {
        //         recordProjRef = recordOfEndTypeLast[destination.index - 1].projectReference;
        //     }
        //     endIndex = chosenProject.tickets.findIndex(x => x.projectReference === recordProjRef);
        // }
      
        //Adjust the overall order of our tickets
        let updatedTicketOrder = moveArrayItemToNewIndex(copyProjectData.tickets, startIndex, endIndex);
        //Adjust the status of the one being moved
        for( let i =0; i < updatedTicketOrder.length; i ++){
            if (updatedTicketOrder[i]._id === movingTicketId){
                updatedTicketOrder[i].status = endingStatus;
            }
        }
        //Assign the new ticket order to the overall project tickets, and update the project
        copyProjectData.tickets = updatedTicketOrder;
        //Setting it locally allows the UI to update immediately, while the server takes a second to complete the update
        setChosenProject(copyProjectData);
/*
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

            let newOrder2 = moveArrayItemToNewIndex(copyProjectData.tickets, startIndex, endIndex)
            console.log(newOrder2)

            let movingTicket = { ...chosenProject.tickets[movingTicketIndex] };
            let newOrder = []
            for(let i = movingTicketIndex; i > destinationTicketIndex - 1; i--){
                newOrder[i] = copyProjectData.tickets[i - 1];
            }

            newOrder[destinationTicketIndex] = movingTicket;
            endResult = findDestination(destination.droppableId); 
            let otherTickets = copyProjectData.tickets.filter( x => x.status !== endResult);
            copyProjectData.tickets = newOrder2
            setChosenProject(copyProjectData);
        }*/

        const response = await updateTicketStatus(movingTicketProjReference, endingStatus, endIndex, startStatus, startIndex);
        if(response.data.success){
            setRefresh(prevState => !prevState);
        }
    }

    let openTickets: Ticket[] = chosenProject.tickets.filter(project => project.status === 'Open');
    let progressTickets: Ticket[] = chosenProject.tickets.filter(project => project.status === 'In Progress');
    let qualityCheckTickets: Ticket[] = chosenProject.tickets.filter(project => project.status === 'Quality Check');
    let finishedTickets: Ticket[] = chosenProject.tickets.filter(project => project.status === 'Finished');
    let backlogTickets: Ticket[] = chosenProject.tickets.filter(project => project.status === 'Backlog');

    //If we are seaching for a specific ticket, we need to adjust our array
    if(ticketSearch){
        openTickets = openTickets.filter(x => x.title.toLowerCase().includes(ticketSearch.toLowerCase()));
        progressTickets = progressTickets.filter(x => x.title.toLowerCase().includes(ticketSearch.toLowerCase()));
        qualityCheckTickets = qualityCheckTickets.filter(x => x.title.toLowerCase().includes(ticketSearch.toLowerCase()));
        finishedTickets = finishedTickets.filter(x => x.title.toLowerCase().includes(ticketSearch.toLowerCase()));
        backlogTickets = backlogTickets.filter(x => x.title.toLowerCase().includes(ticketSearch.toLowerCase()));
    }

  return (<>

    { showAddTicket && <Modal closeModal={setShowAddTicket}> <AddTicketForm closeModal={setShowAddTicket} /> </Modal>}
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='ProjectDashBoard'>
                
                <div className='ProjectDashBoard__Title'> <p> <b>Project:</b> { chosenProject.projectName }</p> </div>

                <div className='ProjectDashBoard_SearchBar'>
                    <SearchBar openModal={setShowAddTicket} searchHandler={(value) => setTicketSearch(value)} />
                </div>

                <div className='ProjectDashBoard__Sections'>
                    {/* Renaming any of these titles means that Util.tsx also needs to be updated */}
                    <Columns title='Open Items' tickets={openTickets}/>
                    <Columns title='In Progress Items' tickets={progressTickets}/>
                    <Columns title='Quality Check Items' tickets={qualityCheckTickets}/>
                    <Columns title='Finished Items' tickets={finishedTickets}/>
                    <Columns title='Backlog Items' tickets={backlogTickets}/>
                </div>

            </div>
        </DragDropContext>
  </>)
}

export default ProjectDashBoard