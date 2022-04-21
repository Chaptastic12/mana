import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';

import { Project, ProjectContextInterface } from '../models/models';
import { stringify } from 'querystring';

const ProjectTicketContext = createContext<ProjectContextInterface | null>(null);

export interface Props {
    children: React.ReactNode
}

const ProjectTicketProvider = (props: Props) =>{

    const [ chosenProject, setChosenProject ] = useState<string>('');
    const [ chosenTicket, setChosenTicket ] = useState<string>('');
    const [ allProjects, setAllProjects ] = useState();
    const [ allTickets, setAllTickets ] = useState()

    useEffect(() => {
        //Get all projects and tickets
    })

    const addProjectToServer = async (project: Project) => {
        try {
            const response = await Axios({
                url: 'http://localhost:8081/api/projects/addNewProject',
                method: 'POST',
                withCredentials: true,
                headers: {
                    'Content-Type' : 'application/json'
                },
                data: JSON.stringify(project)
            })
            
            return { msg: response.data.msg, success: response.data.success };
        } catch (err) { return err }
    }

    const addTicketToServer = () => {

    }

    const getChosenProject = () => {
        
    }
    
    const getChosenTicket = () => {

    }


    return <ProjectTicketContext.Provider value={{
        addProjectToServer
    }}>
        { props.children }
    </ProjectTicketContext.Provider>
};

export { ProjectTicketContext }
export default ProjectTicketProvider;