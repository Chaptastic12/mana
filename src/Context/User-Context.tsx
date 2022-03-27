import React, { createContext, useState } from 'react';

const UserContext = createContext({});

export interface Props {
    children: React.ReactNode
}

const UserProvider = (props: Props) =>{

    const [ dashBoardTicketView, setDashBoardTicketView ] = useState<string>('horizontal');


    return <UserContext.Provider value={{
        dashBoardTicketView, setDashBoardTicketView
    }}>
        { props.children }
    </UserContext.Provider>
};

export { UserContext }
export default UserProvider;