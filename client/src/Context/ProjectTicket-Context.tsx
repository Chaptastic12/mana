import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';

import { Project, ProjectContextInterface, Ticket } from '../models/models';

const ProjectTicketContext = createContext<ProjectContextInterface | null>(null);

export interface Props {
    children: React.ReactNode
}

const ProjectTicketProvider = (props: Props) =>{

    const [ allProjects, setAllProjects ] = useState();
    const [ allTickets, setAllTickets ] = useState();
    const [ retrieveNewData, setRetrieveNewData ] = useState(false);

    useEffect(() => {
        //Get all projects and tickets
        getAllProjectsFromServer();
        getAllTicketsFromServer();
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
                url: 'http://localhost:8081/api/tickets/addNewTicket',
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
    
    const getAllTicketsFromServer = async () => {
        try {
            const response = await Axios({
                url: 'http://localhost:8081/api/tickets/getAllTickets/',
                method: 'GET',
                withCredentials: true,
                headers: {
                    'Content-Type' : 'application/json'
                },
            })
            if (response.data.success){
                setAllTickets(response.data.tickets)
            }
        } catch (err) { return err }
    }

    const getChosenproject = async (projectReference: string) => {
        try {
            const response = await Axios({
                url: 'http://localhost:8081/api/projects/getSpecificProject/' + projectReference,
                method: 'GET',
                withCredentials: true,
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            setRetrieveNewData(prev => !prev);

            return response;
        } catch (err) { return err }
    }
    
    const getChosenTicket = async (projectReference: string ) => {
        try {
            const response = await Axios({
                url: 'http://localhost:8081/api/tickets/getSpecificTicket/' + projectReference,
                method: 'GET',
                withCredentials: true,
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            setRetrieveNewData(prev => !prev);

            return response;
        } catch (err) { return err }
    }

    const updateTicketStatus = async (source: {}, destination: {}, projRef: string) => {
        console.log(source, destination, projRef)
        try {
            const response = await Axios({
                url: 'http://localhost:8081/api/tickets/updateTicketStatus/',
                method: 'POST',
                withCredentials: true,
                headers: {
                    'Content-Type' : 'application/json'
                },
                data: JSON.stringify({
                    source, destination, projRef
                })
            })
            setRetrieveNewData(prev => !prev);
            return response;
        } catch (err) { return err }
    }


    return <ProjectTicketContext.Provider value={{
        addProjectToServer, addTicketToServer,
        allProjects, getChosenTicket, allTickets,
        getChosenproject, updateTicketStatus
    }}>
        { props.children }
    </ProjectTicketContext.Provider>
};

export { ProjectTicketContext }
export default ProjectTicketProvider;