import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';

import { Project, ProjectContextInterface, Ticket } from '../models/models';
import { stringify } from 'querystring';

const ProjectTicketContext = createContext<ProjectContextInterface | null>(null);

export interface Props {
    children: React.ReactNode
}

const ProjectTicketProvider = (props: Props) =>{

    const [ chosenProject, setChosenProject ] = useState<string>('');
    const [ chosenTicket, setChosenTicket ] = useState<string>('');
    const [ allProjects, setAllProjects ] = useState();
    const [ allTickets, setAllTickets ] = useState();
    const [ retrieveNewData, setRetrieveNewData ] = useState(false);

    useEffect(() => {
        //Get all projects and tickets
        getAllProjectsFromServer();
    }, [retrieveNewData])

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
            setRetrieveNewData(prev => !prev);

            return { msg: response.data.msg, success: response.data.success };
        } catch (err) { return err }
        
    }

    const getAllProjectsFromServer = async () => {
        try {
            const response = await Axios({
                url: 'http://localhost:8081/api/projects/getAllProjects',
                method: 'GET',
                withCredentials: true,
                headers: {
                    'Content-Type' : 'application/json'
                },
            })
            if (response.data.success){
                setAllProjects(response.data.projects)
            }
        } catch (err) { return err }
    }

    const addTicketToServer = async(ticket: Ticket) => {
        try {
            const response = await Axios({
                url: 'http://localhost:8081/api/projects/addNewTicket',
                method: 'POST',
                withCredentials: true,
                headers: {
                    'Content-Type' : 'application/json'
                },
                data: JSON.stringify(ticket)
            })
            setRetrieveNewData(prev => !prev);

            return { msg: response.data.msg, success: response.data.success };
        } catch (err) { return err }
    }

    const getChosenProject = () => {
        
    }
    
    const getChosenTicket = () => {

    }


    return <ProjectTicketContext.Provider value={{
        addProjectToServer, addTicketToServer,
        allProjects
    }}>
        { props.children }
    </ProjectTicketContext.Provider>
};

export { ProjectTicketContext }
export default ProjectTicketProvider;