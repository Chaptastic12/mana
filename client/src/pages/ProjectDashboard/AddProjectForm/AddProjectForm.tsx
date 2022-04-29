import React, { useState, useContext, useEffect } from 'react'

import { IoIosCloseCircleOutline } from 'react-icons/io'
import ErrorBar from '../../../components/ErrorBar/ErrorBar'
import { v4 as uuid } from 'uuid';
import { Project, Ticket } from '../../../models/models';

import { ProjectTicketContext } from '../../../Context/ProjectTicket-Context'

import './AddProjectForm.css';
import { ProjectContextInterface } from '../../../models/models';

export interface Props {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}


const AddProjectForm = (props: Props) => {

    const { addProjectToServer, allProjects } = useContext(ProjectTicketContext) as ProjectContextInterface;

    const emptyTicket = {
        openTickets: [],
        inProgress: [],
        qualityCheck: [],
        finishedTickets: [],
        backlogTickets: []
    }

    let date = new Date();
    let formatdate = date.toLocaleDateString();
    const [ error, setError ] = useState<string>('');
    const [ projectData, setProjectData ] = useState({ id: uuid().toString(), projectReference: '', projectName: '', tickets: emptyTicket, createdDate: formatdate, numTickets: 0 });

    const AllProjects: Project[] = allProjects;
    
    const fieldsAreValidated = async () => {
        //Verify projectName and projectReference do not already exist;
        //Verify that they are not empty

        const verifyProjectName = AllProjects.filter(x => x.projectName === projectData.projectName).length > 0;
        const verifyProjectReference = AllProjects.filter(x => x.projectReference === projectData.projectReference).length > 0;

        if(verifyProjectName || verifyProjectReference === true){
            setError('Entered in Name or Reference in use; Please set a new one.');
            return
        }
        if(projectData.projectReference.length < 3 || projectData.projectName.length < 5 ){
            setError('Please enter in a Reference that is 3 characters or longer, or a Name more than 5 characters.');
            return;
         }

         let response: any = await addProjectToServer({...projectData});

         if(!response.success){
             setError(response.msg);
             return;
         }
    
        //  ALLPROJECTS.push({...projectData, tickets: [] });
         props.closeModal(false);
    }

  return (
    <div className='AddProjectForm'>
        <div className='AddProjectForm__Header'>
            <div className='Title'><h1>Create Project</h1></div>
            <div className='Close' onClick={() => props.closeModal(false) }> <IoIosCloseCircleOutline /> </div>
            <hr style={{ width: '95%' }}/>
        </div>
        { error && <div className='AddProjectForm__Error'><ErrorBar errorMsg={error}/> </div>}
        <div className='AddProjectForm__Form'>
            <div className='Input'>
                <label>Project Name</label>
                <input type='text' placeholder='Project Name' value={projectData.projectName} onChange={(e) => setProjectData({ ...projectData, projectName: e.target.value }) }  /> 
            </div>
            <div className='Input'>
                <label>Project Reference </label>
                <input type='text' placeholder='Project Reference' value={projectData.projectReference} onChange={(e) => setProjectData({ ...projectData, projectReference: e.target.value }) }  /> 
            </div>
        </div>
        <div className='AddProjectForm__Button'>
            <button onClick={() => fieldsAreValidated()}>Submit</button>
            <button onClick={() => props.closeModal(false)}>Close</button>
        </div>
    </div>
  )
}

export default AddProjectForm