import React, { createContext, useState, useEffect, FunctionComponent } from 'react';


export const UserContext = createContext({ dashBoardTicketView: 'horizontal'});

// type Props = {
//     children: React.ReactNode
// }

const UserProvider = () =>{

    const [ dashBoardTicketView, setDashBoardTicketView ] = useState<string>('horizontal');


    return <UserContext.Provider value={{
        dashBoardTicketView
    }}>
    </UserContext.Provider>
};

export default UserProvider;