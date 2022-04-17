import React, { createContext, useState } from 'react';

const ProjectTicketContext = createContext({
    getChosenTicket: () => {},
    getChosenProject: () => {}
});

export interface Props {
    children: React.ReactNode
}

const ProjectTicketProvider = (props: Props) =>{

    const [ chosenProject, setChosenProject ] = useState<string>('');
    const [ chosenTicket, setChosenTicket ] = useState<string>('');

    const getChosenProject = () => {
        
    }
    
    const getChosenTicket = () => {

    }


    return <ProjectTicketContext.Provider value={{
        getChosenProject, getChosenTicket
    }}>
        { props.children }
    </ProjectTicketContext.Provider>
};

export { ProjectTicketContext }
export default ProjectTicketProvider;