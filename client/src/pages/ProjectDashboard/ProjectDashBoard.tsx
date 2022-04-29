import { useState, useEffect, useContext } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useParams } from 'react-router-dom';

import { Ticket, ProjectContextInterface, Project } from '../../models/models';
import { moveTicketToCorrectArray } from './Util';
import { ProjectTicketContext } from '../../Context/ProjectTicket-Context';
import Columns from './Columns/Columns';
import SearchBar from './SearchBar/SearchBar';

import './ProjectDashBoard.css';
import Modal from '../../components/Modal/Modal';
import AddTicketForm from './AddTicketForm/AddTicketForm';

const EMPTY_PROJECT = { 
    id: '0',
    tickets: {
        openTickets: [],
        inProgress: [],
        qualityCheck: [],
        finishedTickets: [],
        backlogTickets: []
    },
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
        if(chosenProject.tickets){
            const { source, destination } = result;
            let copyProjectData = { ...chosenProject };

            if(!destination){ return }

            const updatedArray = moveTicketToCorrectArray(source, destination, copyProjectData)
            setChosenProject(updatedArray.project);

            const response = await updateTicketStatus(source, destination, updatedArray.projRef);
            if(response.data.success){
                setRefresh(prevState => !prevState);
            }
        }
    }

    let openTickets: Ticket[] = [ ...chosenProject.tickets.openTickets ];
    let progressTickets: Ticket[] = [ ...chosenProject.tickets.inProgress ];
    let qualityCheckTickets: Ticket[] = [ ...chosenProject.tickets.qualityCheck ];
    let finishedTickets: Ticket[] = [ ...chosenProject.tickets.finishedTickets ];
    let backlogTickets: Ticket[] = [ ...chosenProject.tickets.backlogTickets ];

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