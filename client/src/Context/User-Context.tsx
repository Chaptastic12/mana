import React, { createContext, useState } from 'react';
import Axios from 'axios';

import { UserContextInterface } from '../models/models';

const UserContext = createContext<UserContextInterface | null>(null);

export interface Props {
    children: React.ReactNode
}

const UserProvider = (props: Props) =>{

    const [ user, setUser ] = useState({username: ''});

    const loginUser = async (username: string, password: string) => {
        try {
            const data = {
                username,
                password
            }
            const response = await Axios({
                method: 'POST',
                url: 'http://localhost:8081/api/auth/loginUser',
                headers: {
                    'Content-Type' : 'application/json',
                    credentials: 'include'
                },
                withCredentials: true,
                data: JSON.stringify(data)

            })
            if(response.data.success){
                setUser({ username: response.data.userInfo.username });
            } 
            return { msg: response.data.msg, success: response.data.success };
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
            console.log(response)
            if(response.data.success){
                setUser({ username: response.data.userInfo.username });
            } 
            return { msg: response.data.msg, success: response.data.success };
        } catch (err) {
            return err;
        }        
    }

    const logoutUser = async () => {
        try {
            const response = await Axios.post('http://localhost:8081/api/auth/logoutUser');
            if(response.data.success){
                setUser({ username: '' });
            } 
            return { msg: response.data.msg, success: response.data.success };
        } catch (err) {
            return err;
        }      
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