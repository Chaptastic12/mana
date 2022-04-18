import React, { createContext, useState } from 'react';
import Axios, { AxiosResponse } from 'axios';

const UserContext = createContext({});

export interface Props {
    children: React.ReactNode
}

const UserProvider = (props: Props) =>{

    const [ dashBoardTicketView, setDashBoardTicketView ] = useState<string>('horizontal');
    const [ user, setUser ] = useState();

    const loginUser = (username: string, password: string) => {
        Axios.get('http://localhost:8081/api/auth/loginUser', {
            params: {
                username: username,
                password: password
            }
        })
        .then( (res: AxiosResponse) => {
            setUser(res.data);
            return { msg: 'Welcome, ' + res.data.username }
        })
    }

    const registerUser = (username: string, email: string, password: string) => {
        Axios.post('http://localhost:8081/api/auth/registerUser', {
            params: {
                username: username,
                email: email,
                password: password
            }
        })
        .then( (res: AxiosResponse) => {
            return { msg: 'User registered successfully' }
        })
    }

    const logoutUser = () => {
        Axios.get('http://localhost:8081/api/auth/logoutUser')
        .then( (res: AxiosResponse) => {
            return { msg: 'Successfully logged out' }
        })
    }


    return <UserContext.Provider value={{
        dashBoardTicketView, setDashBoardTicketView,
        loginUser, registerUser, logoutUser,
        user
    }}>
        { props.children }
    </UserContext.Provider>
};

export { UserContext }
export default UserProvider;