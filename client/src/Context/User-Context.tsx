import React, { createContext, useState } from 'react';
import Axios, { AxiosResponse } from 'axios';

import { UserContextInterface } from '../models/models';

const UserContext = createContext<UserContextInterface | null>(null);

export interface Props {
    children: React.ReactNode
}

const UserProvider = (props: Props) =>{

    const [ user, setUser ] = useState({username: ''});

    const loginUser = async (username: string, password: string) => {
        try {
            const response = await Axios.post('http://localhost:8081/api/auth/loginUser', {
                data: {
                    username: username,
                    password: password
                },
                withCredentials: true
            });
            console.log(response);
        } catch (err) {
            return err;
        }
    }

    const registerUser = async (username: string, email: string, password: string) => {
        try {
            const response = await Axios.post('http://localhost:8081/api/auth/registerUser', {
                data: {
                    username: username,
                    email: email,
                    password: password
                }
            })
            console.log(response.data)
            return response.data;
        } catch (err) {
            return err;
        }        
    }

    const logoutUser = () => {
        Axios.get('http://localhost:8081/api/auth/logoutUser')
        .then( (res: AxiosResponse) => {
            return { msg: 'Successfully logged out' }
        })
    }


    return <UserContext.Provider value={{
        loginUser, registerUser, logoutUser,
        user
    }}>
        { props.children }
    </UserContext.Provider>
};

export { UserContext }
export default UserProvider;